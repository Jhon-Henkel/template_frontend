<script setup lang="ts">
import AppPage from "~/components/page/app-page.vue";
import {BreadcrumbDTO} from "~/components/breadcrumb/dto/breadcrumb.dto";
import {BreadcrumbItemDTO} from "~/components/breadcrumb/dto/breadcrumb.item.dto";
import AppFormInput from "~/components/input/app-form-input.vue";
import AppButton from "~/components/button/app-button.vue";
import {appAlert} from "~/composables/alert/alert";
import {useNotify} from "~/composables/notification/notify";
import AppFormTextAreaInput from "~/components/input/app-form-text-area-input.vue";
import AppFormRichTextInput from "~/components/input/app-form-rich-text-input.vue";
import AppFormFileInput from "~/components/input/app-form-file-input.vue";
import AppGrid from "~/components/grid/app-grid.vue";
import AppPageTitle from "~/components/page/app-page-title.vue";
import AppPageSubTitle from "~/components/page/app-page-sub-title.vue";
import AppPdfPreview from "~/components/files/preview/app-pdf-preview.vue";
import {PdfPreviewDto} from "~/components/files/preview/pdf-preview.dto";
import AppFormInputNumber from "~/components/input/app-form-input-number.vue";
import AppTabs from "~/components/tabs/app-tabs.vue";
import TabsDto from "~/components/tabs/tabs.dto";
import AppFormSelect from "~/components/select/app-form-select.vue";
import AppFormDatepicker from "~/components/input/app-form-datepicker.vue";
import AppFormInputAmount from "~/components/input/app-form-input-amount.vue";
import AppFormInputPercent from "~/components/input/app-form-input-percent.vue";
import AppTable from "~/components/table/app-table.vue";
import {TableColumnHeaderDTO} from "~/components/table/dto/table.column.header.dto";
import type {TableActionItem} from "~/components/table/type/table.row.item.actions.type";
import {IconEnum} from "~/utils/enum/icon.enum";
import AppNotice from "~/components/notice/app-notice.vue";
import AppFilesList from "~/components/files/app-files-list.vue";
import AppFormSwitch from "~/components/input/app-form-switch.vue";
import AppCheckBox from "~/components/input/app-check-box.vue";

const breadcrumb = new BreadcrumbDTO([new BreadcrumbItemDTO(PagesMap.page.develop)])
const notify = useNotify()

const richText = ref('<br><br><br><br><br><br><br><br><br><br><br><br>')
const number = ref(0)
const select = ref(0)
const date = ref('')
const switchItem = ref(false)

const tabsItems = [
    new TabsDto('Tab 1', 'contentone'),
    new TabsDto('Tab 2', 'contenttwo'),
    new TabsDto('Tab disabled', 'contentthree', true),
]

function actions(): TableActionItem[] {
    return [
        {
            label: 'Editar',
            icon: IconEnum.pencil,
            onSelect() {
                appAlert('Ação editar!')
            },
        },
        {
            label: 'Deletar',
            icon: IconEnum.x,
            onSelect() {
                appAlert('Ação deletar!')
            },
            color: 'error',
        }
    ]
}

const columns: TableColumnHeaderDTO = new TableColumnHeaderDTO(false)
columns.addColumn('id', 'ID')
columns.addColumn('name', 'Nome')
columns.addColumnOptions(actions)
</script>

<template>
    <AppPage page-title="App - Develop" :breadcrumb="breadcrumb" class="mb-20">
        <h1><b>Componentes</b></h1>
        <p>Todos os componentes dessa página já estão configurados para suportar temas e outras particularidades do nosso sistema.</p>
        <p>Para ver todas as variações e personalização disponível em um componente, verifique os props que o componente suporta.</p>

        <div class="space-y-3 space-x-3">
            <br>
            <span><b>Inputs</b></span>
            <hr>
            <app-form-input label="Input" model-value="" name="app-form-input" placeholder="input" css-class="w-full"/>
            <app-form-input label="Input com descrição" model-value="" name="app-form-input" placeholder="input com descrição" description="Essa é uma descrição para o input" css-class="w-full"/>
            <app-form-input label="Input required" model-value="" name="app-form-input" placeholder="input required" :required="true" css-class="w-full"/>
            <app-form-input label="Input com hint" model-value="" name="app-form-input" placeholder="input com hint" hint="Este é um exemplo de input com hint" css-class="w-full"/>
            <app-form-input-number v-model="number" label="Input number" name="app-form-input" css-class="w-full"/>
            <app-form-input-amount v-model="number" label="Input amount" name="app-form-input" css-class="w-full" currency="BRL"/>
            <app-form-input-percent v-model="number" label="Input percent" name="app-form-input" css-class="w-full"/>
            <app-form-file-input label="Input um arquivo" model-value="" name="app-form-input" css-class="w-full"/>
            <app-form-file-input label="Input múltiplos arquivos" model-value="" name="app-form-input" :multiple="true" css-class="w-full"/>
            <app-form-text-area-input label="Input text area" model-value="" name="app-form-input" placeholder="input text area" css-class="w-full"/>
            <app-form-rich-text-input v-model="richText" label="Input tich text" name="message" css-class="w-full"/>
            <app-form-select :items="[{id: 1, label: 'Item 1'}, {id: 2, label: 'Item 2'}]" :model-value="select" label="Select" name="select" description="Para busca na api, use o 'app-form-select-search-api'"/>
            <app-form-datepicker v-model="date" label="Date Picker" name="datepicker"/>
            <app-form-switch v-model="switchItem" label="Switch" name="switchIten"/>
            <app-check-box label="Check-Box" name="check-box"/>

            <br>
            <br>
            <span><b>Grid</b></span>
            <hr>
            <app-grid :cols="2">
                <app-form-input label="Input 1" model-value="" name="app-form-input" placeholder="input" css-class="w-full"/>
                <app-form-input label="Input 2" model-value="" name="app-form-input" placeholder="input" css-class="w-full"/>
                <app-form-input label="Input 3" model-value="" name="app-form-input" placeholder="input" css-class="w-full"/>
                <app-form-input label="Input 4" model-value="" name="app-form-input" placeholder="input" css-class="w-full"/>
            </app-grid>

            <br>
            <br>
            <span><b>Botões</b></span>
            <hr>
            <app-button>Cor do tema</app-button>
            <app-button color="success">Success</app-button>
            <app-button color="neutral">Neutral</app-button>
            <app-button color="error">Error</app-button>
            <app-button color="primary">Primary</app-button>
            <app-button color="secondary">Secondary</app-button>
            <app-button color="info">Info</app-button>
            <app-button color="warning">Warning</app-button>
            <app-button :loading="true">Loading</app-button>

            <br>
            <br>
            <span><b>Notificações</b></span>
            <hr>
            <app-button @click="notify.success('Esta é uma notificação de sucesso')">Success</app-button>
            <app-button color="error" @click="notify.error('Esta é uma notificação de erro')">Error</app-button>

            <br>
            <br>
            <span><b>Alerts</b></span>
            <hr>
            <app-button @click="appAlert.success('Alerta de sucesso!', 'Este é um alerta de sucesso')">Success</app-button>
            <app-button color="error" @click="appAlert.error('Alerta de erro!', 'Este é um alerta de erro')">Error</app-button>

            <br>
            <br>
            <span><b>Preview Arquivo</b></span>
            <hr>
            <app-pdf-preview :item="new PdfPreviewDto('Preview PDF', '', 1)"/>

            <br>
            <br>
            <span><b>Pagina</b></span>
            <hr>
            <app-page-title title="Page Title"/>
            <app-page-sub-title title="Page Sub Title"/>

            <br>
            <br>
            <span><b>Tabs</b></span>
            <hr>
            <app-tabs :items="tabsItems">
                <template #contentone>
                    <p>Conteúdo sessão 1</p>
                </template>
                <template #contenttwo>
                    <p>Conteúdo sessão 2</p>
                </template>
            </app-tabs>

            <br>
            <br>
            <span><b>Tabela (para api, use app-table-api)</b></span>
            <hr>
            <app-table :columns="columns" :data="[{id: 1, name: 'John Doe'}, {id: 2, name: 'Marta Rocha'}]"/>

            <br>
            <br>
            <span><b>Avisos</b></span>
            <hr>
            <app-notice color="error" title="Aviso" description="Aviso erro!"/>
            <app-notice color="info" title="Aviso" description="Aviso info!"/>
            <app-notice color="neutral" title="Aviso" description="Aviso neutral!"/>
            <app-notice color="primary" title="Aviso" description="Aviso primary!"/>
            <app-notice color="secondary" title="Aviso" description="Aviso secondary!"/>
            <app-notice color="success" title="Aviso" description="Aviso success!"/>
            <app-notice color="warning" title="Aviso" description="Aviso warning!"/>

            <br>
            <br>
            <span><b>Lista de arquivos</b></span>
            <hr>
            <app-files-list :files="[{id: 1, filename: 'teste', filepath: 'teste'}]"/>
        </div>
    </AppPage>
</template>
