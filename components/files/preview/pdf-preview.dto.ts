export class PdfPreviewDto {
    public label: string
    public apiGroup: any
    public itemId: number

    constructor(label: string, apiGroup: any, itemId: number) {
        this.label = label
        this.apiGroup = apiGroup
        this.itemId = itemId
    }
}
