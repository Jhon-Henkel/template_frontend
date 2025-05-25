import type {TableColumn} from "@nuxt/ui";
import {UBadge, UButton, UDropdownMenu} from "#components";
import type {TableActionItem} from "~/components/table/type/table.row.item.actions.type";
import {IconEnum} from "~/utils/enum/icon.enum";
import type {Column} from '@tanstack/vue-table'
import type {Row} from "@tanstack/table-core";
import {useNotify} from "~/composables/notification/notify";
import {StatusActiveInactiveEnum} from "~/utils/enum/status.active.inactive.enum";
import {DateUtil} from "~/utils/date/date.util";

export class TableColumnHeaderDTO {
    protected object: TableColumn<any>[] = []
    protected haveSorting: boolean

    constructor(haveSorting: boolean = true) {
        this.haveSorting = haveSorting
    }

    public addColumn(key: string, label: string): void {
        this.object.push({
            accessorKey: key,
            header: ({ column }) => this.getHeader(column, label),
        })
    }

    public addColumnWithCell(key: string, label: string, cell: (row: Row<any>) => any): void {
        this.object.push({
            accessorKey: key,
            header: ({ column }) => this.getHeader(column, label),
            cell: ({ row }) => cell(row)
        })
    }

    public addDateColumn(key: string, label: string): void {
        this.object.push({
            accessorKey: key,
            header: ({ column }) => this.getHeader(column, label),
            cell: ({ row }) => {
                return h('div', {}, DateUtil.convertStringUsaToBr(row.original[key]));
            }
        })
    }

    // Essa função depende de o resultado ter uma coluna de label e outra de id, usar dessa forma quando a label tem que ser retornada na busca por termo
    public addBadgeStatusColumn(key: string, label: string, statusIdColumn: string): void {
        this.object.push({
            accessorKey: key,
            header: ({ column }) => this.getHeader(column, label),
            cell: ({ row }) => {
                const id = row.original[statusIdColumn]
                const label = row.original[key]
                return h(UBadge, { class: StatusActiveInactiveEnum.cssBadgeClass(id) }, { default: () => label.toUpperCase() });
            }
        })
    }

    // Essa função faz o mapeamento automático da label, usar dessa forma quando a label não tem que ser retornada na busca por termo
    public addBadgeStatusColumnAutoLabel(key: string, label: string): void {
        this.object.push({
            accessorKey: key,
            header: ({ column }) => this.getHeader(column, label),
            cell: ({ row }) => {
                const id = row.original[key]
                const label = StatusActiveInactiveEnum.label(id)
                return h(UBadge, { class: StatusActiveInactiveEnum.cssBadgeClass(id) }, { default: () => label.toUpperCase() });
            }
        })
    }

    public addColumnWithJoin(key: string, label: string, join: string, separator: string = '-', textEnd: string = '', joinSide: "left" | "right" = "right"): void {
        this.object.push({
            accessorKey: key,
            header: ({ column }) => this.getHeader(column, label),
            cell: ({ row }) => {
                let joinColumn = row.original[join]
                if (joinColumn === null) {
                    joinColumn = ''
                } else {
                    if (joinSide === 'left') {
                        joinColumn = ` ${joinColumn} ${separator}`
                    } else {
                        joinColumn = ` ${separator} ${joinColumn}`
                    }
                }
                if (joinSide === 'left') {
                    return `${joinColumn}${row.original[key]}${textEnd}`
                }
                return `${row.original[key]}${joinColumn}${textEnd}`
            }
        })
    }

    public addCurrencyColumn(key: string, label: string): void {
        this.object.push({
            accessorKey: key,
            header: ({ column }) => this.getHeader(column, label),
            cell: ({ row }) => {
                const value: number = parseFloat(String(row.original[key]))
                return `${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            }
        })
    }

    public addCurrencyColumnWithJoin(key: string, label: string, join: string): void {
        this.object.push({
            accessorKey: key,
            header: ({ column }) => this.getHeader(column, label),
            cell: ({ row }) => {
                let joinColumn = row.original[join]
                if (joinColumn === null) {
                    joinColumn = ''
                } else {
                    joinColumn = `${joinColumn} `
                }
                const value: number = parseFloat(String(row.original[key]))
                return `${joinColumn}${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            }
        })
    }

    public addColumnLink(key: string, label: string, linkKey: string): void {
        this.object.push({
            accessorKey: key,
            header: ({ column }) => this.getHeader(column, label),
            cell: ({ row }) => {
                return h(
                    'a',
                    {
                        rel: 'noopener noreferrer',
                        class: 'text-blue-500 hover:underline cursor-pointer',
                        onClick: (event: Event): void => {
                            event.preventDefault();
                            const newTab = window.open(row.original[linkKey], '_blank');
                            if (newTab) {
                                newTab.focus();
                            } else {
                                useNotify().error('Erro ao abrir o link.');
                            }
                        }
                    },
                    row.original[key]
                );
            }
        })
    }

    public addColumnOptions(actions: (object: any) => TableActionItem[]): void {
        this.object.push({
            id: 'actions',
            header: () => h('div', { class: 'text-right w-full' }, 'Ações'),
            cell: ({row}) => {
                return h(
                    'div',
                    {class: 'text-right'},
                    h(
                        UDropdownMenu,
                        {
                            content: {
                                align: 'end'
                            },
                            items: actions(row.original),
                            'aria-label': 'Actions dropdown'
                        },
                        () => h(UButton, {
                            icon: 'i-lucide-ellipsis-vertical',
                            color: 'neutral',
                            variant: 'ghost',
                            class: 'ml-auto',
                            'aria-label': 'Actions dropdown'
                        })
                    )
                )
            }
        })
    }

    public getObject(): TableColumn<any>[] {
        return this.object
    }

    protected getHeader(column: Column<any>, label: string) {
        if (!this.haveSorting) {
            return h('div', { class: 'text-left w-full' }, label)
        }

        const isSorted = column.getIsSorted()

        return h(
            UDropdownMenu,
            {
                content: {
                    align: 'start'
                },
                'aria-label': 'Actions dropdown',
                items: [
                    {
                        label: 'Asc',
                        type: 'checkbox',
                        icon: IconEnum.arrowUpNarrowWide,
                        checked: isSorted === 'asc',
                        onSelect: () => {
                            if (isSorted === 'asc') {
                                column.clearSorting()
                            } else {
                                column.toggleSorting(false)
                            }
                        }
                    },
                    {
                        label: 'Desc',
                        icon: IconEnum.arrowDownWideNarrow,
                        type: 'checkbox',
                        checked: isSorted === 'desc',
                        onSelect: () => {
                            if (isSorted === 'desc') {
                                column.clearSorting()
                            } else {
                                column.toggleSorting(true)
                            }
                        }
                    }
                ]
            },
            () => h(UButton, {
                color: 'neutral',
                variant: 'ghost',
                label,
                icon: isSorted ? isSorted === 'asc' ? IconEnum.arrowUpNarrowWide : IconEnum.arrowDownWideNarrow : IconEnum.arrowUpDown,
                class: '-mx-2.5 data-[state=open]:bg-elevated', 'aria-label': `Sort by ${isSorted === 'asc' ? 'descending' : 'ascending'}`
            })
        )
    }
}
