<script setup lang="ts">
import type { TableColumn } from '#ui/components/Table.vue'

const rows = Array.from({ length: 10000 }).map((_, index) => ({
  id: index,
  name: 'John Doe',
  email: 'john@doe.com',
  role: 'Admin'
}))

const UBadge = resolveComponent('UBadge')

const columns: TableColumn<typeof rows[number]>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    meta: {
      class: {
        th: 'w-20',
        td: 'w-20'
      }
    }
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => h(UBadge, { color: 'primary', variant: 'outline' }, () => row.original.role)
  }
]
</script>

<template>
  <UCard class="w-full">
    <UTable
      :data="rows"
      :columns="columns"
      virtualize
      sticky
      class="h-[700px]"
    />
  </UCard>
</template>
