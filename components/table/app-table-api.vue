<script setup lang="ts">
import {getPaginationRowModel} from "@tanstack/vue-table";
import {UButton} from "#components";
import {useTheme} from "~/composables/theme/use.theme";
import type {IServiceList} from "~/utils/interface/service.list.interface";
import {TableColumnHeaderDTO} from "~/components/table/dto/table.column.header.dto";
import type {IServiceSecondaryList} from "~/utils/interface/service.secondary.list.interface";

const props = defineProps({
    service: {
        type: Object as PropType<IServiceList<any> | IServiceSecondaryList<any>>,
        required: true,
    },
    columns: {
        type: TableColumnHeaderDTO,
        required: true,
    },
    fixColumn: {
        type: String,
        required: false,
        default: undefined,
    },
    orderBy: {
        type: String,
        default: 'id',
    },
    orderByDirection: {
        type: String,
        default: 'desc',
    },
    secondaryListId: {
        type: Number,
        required: false,
        default: undefined,
    }
})

const data = ref()
const limit = ref(10)
const total = ref(0)
const from = ref(0)
const to = ref(0)
const loading = ref(false)
const globalFilter = ref('')
const { currentTheme } = useTheme()
const table = useTemplateRef('table')
const orderBy = ref(props.orderBy)
const orderByDirection = ref(props.orderByDirection)
const device = useDevice()

const list = async (page: number = 1) => {
    loading.value = true
    if (props.service.kind === 'IServiceList') {
        data.value = await props.service.list(page, limit.value, globalFilter.value, orderBy.value, orderByDirection.value)
    } else if (props.service.kind === 'IServiceSecondaryList' && props.secondaryListId !== undefined) {
        data.value = await props.service.list(page, limit.value, globalFilter.value, orderBy.value, orderByDirection.value, props.secondaryListId)
    }
    limit.value = data.value.per_page
    pagination.value.pageSize = data.value.per_page
    total.value = data.value.total
    from.value = data.value.from
    to.value = data.value.to
    loading.value = false
}

const pagination = ref({
    pageIndex: 0,
    pageSize: limit.value,
})

const sorting = ref([{
    id: orderBy.value,
    desc: orderByDirection.value === 'desc',
}])

async function refresh(): Promise<void> {
    loading.value = true
    limit.value = 10
    total.value = 0
    from.value = 0
    to.value = 0
    globalFilter.value = ''
    orderBy.value = props.orderBy
    orderByDirection.value = props.orderByDirection
    await list()
    loading.value = false
}

defineExpose({
    refresh,
})

onMounted(async () => {
    await list()

})

watch(globalFilter, () => {
    list()
})

watch(limit, () => {
    list()
})

watch(sorting, () => {
    if (sorting.value.length > 0) {
        orderBy.value = sorting.value[0].id
        orderByDirection.value = sorting.value[0].desc ? 'desc' : 'asc'
    } else {
        orderBy.value = props.orderBy
        orderByDirection.value = props.orderByDirection
    }
    list()
})

const columnPinning = ref({
    left: [props.fixColumn],
    right: []
})
</script>

<template>
    <div class="w-full space-y-4 pb-4 overflow-x-auto">
        <div class="flex py-3.5 border-b border-accented justify-between">
            <UInput v-model="globalFilter" placeholder="Procure por algo..." :ui="{ trailing: 'pe-1' }" :color="currentTheme.primaryColorRoot">
                <template v-if="globalFilter?.length" #trailing>
                    <UButton color="neutral" variant="link" size="sm" icon="i-lucide-circle-x" aria-label="Clear input" @click="globalFilter = ''"/>
                </template>
            </UInput>
            <USelect v-model="limit" :items="[10, 25, 50, 100]"/>
        </div>
        <div class="overflow-x-auto w-full">
            <UTable
                ref="table"
                v-model:pagination="pagination"
                v-model:column-pinning="columnPinning"
                v-model:sorting="sorting"
                sticky
                :data="data?.data"
                :columns="columns.getObject()"
                :pagination-options="{ getPaginationRowModel: getPaginationRowModel() }"
                :empty="loading ? 'Carregando...' : 'Poxa, não encontramos nada aqui :('"
                :loading="loading"
                :loading-color="currentTheme.primaryColorRoot"
                loading-animation="swing"
                class="flex-1"
            />
        </div>
        <div :class="[(device.isMobile ? 'justify-items-center text-center' : 'flex justify-between'), 'border-t border-default pt-4']">
            <span>Exibindo {{ from ?? 0 }} - {{ to ?? 0 }} de {{ total }} Registros</span>
            <UPagination :default-page="1" :items-per-page="limit" :total="total" :active-color="currentTheme.primaryColorRoot" @update:page="(p) => list(p)"/>
        </div>
    </div>
</template>
