<script setup lang="ts">
import type {PdfPreviewDto} from "~/components/files/preview/pdf-preview.dto";
import {useNotify} from "~/composables/notification/notify";

const props = defineProps({
    item: {
        type: Object as PropType<PdfPreviewDto>,
        required: true,
    }
})

async function preview(event: Event): Promise<void> {
    event.preventDefault();
    const pdfRequest = await props.item.apiGroup.pdf(props.item.itemId)
    const fileUrl = pdfRequest.data.fileUrl
    const newTab = window.open(fileUrl, '_blank');
    if (newTab) {
        newTab.focus();
    } else {
        useNotify().error('Erro ao abrir o PDF. Verifique se o pop-up está habilitado.');
    }
}
</script>

<template>
    <div class="rounded-lg p-3 w-fit flex items-center gap-3 shadow-md">
        <NuxtImg  src="/assets/images/pdf.svg" alt="PDF" class="w-8 h-8" />
        <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-600">{{ item.label }}</span>
            <ULink as="button" class="text-blue-500 text-sm hover:underline cursor-pointer" @click="preview">
                Visualizar
            </ULink>
        </div>
    </div>
</template>
