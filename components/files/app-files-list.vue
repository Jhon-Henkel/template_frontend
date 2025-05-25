<script setup lang="ts">
defineProps({
    files: {
        type: Object as PropType<{id: number, filename: string, filepath: string}[]>,
        required: true,
    }
})
</script>

<template>
    <div v-if="files.length > 0" class="bg-old-neutral-200 p-4 rounded-md shadow-md">
        <span>Arquivos já anexados:</span>
        <ul>
            <li v-for="file in files" :key="file.id">
                <a :href="file.filepath" target="_blank" class="cursor-pointer text-blue-500 hover:underline text-sm">
                    {{ file.filename }}
                </a>
            </li>
        </ul>
    </div>
</template>
