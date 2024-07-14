<template>
    <div class="clients">
        <!-- titre et bouton ajouter -->
        <div class="row border-bottom pb-3 mb-3">
            <div class="col">
                <h1 class="h3"><i class="fa-solid fa-angle-down me-2" />Liste des clients</h1>
            </div>
            <div class="col text-end">
                <button @click="$router.push({ name: 'create-client' })" class="btn btn-outline-primary">
                    <i class="fa-solid fa-plus-circle me-2" />
                    Ajouter une facture
                </button>
            </div>
        </div>

        <!-- tableau des factures -->
        <TableList v-if="!loading && clients">
            <!-- exemple pour personnaliser les th du tableau TableList : -->
            <template #thead>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Entreprise</th>
                <th class="text-end">Date</th>
                <th class="text-end">Actions</th>
            </template>
            <ClientTableRow v-for="client in clients" :key="client.idclient" :client="client"
                @edit="$router.push({ name: 'edit-client', params: { id: $event.id } })"
                @delete="deleteClient($event.id)" />
        </TableList>

        <div v-else>Loading...</div>

        <AppDebug :datas="clients" />
    </div>
</template>

<script>
import ClientTableRow from '@/components/tables/ClientTableRow.vue'
import TableList from '@/components/tables/TableList.vue'
import { useClientStore } from '@/stores/client'
import { mapActions, mapState } from 'pinia'
export default {
    components: {
        TableList,
        ClientTableRow
    },
    computed: {
        ...mapState(useClientStore, {
            clients: 'items',
            loading: 'loading'
        })
    },
    created() {
        // watch the params of the route to fetch the data again
        this.$watch(
            () => this.$route.params.id,
            this.getClients,
            // fetch the data when the view is created and the data is
            // already being observed
            { immediate: true }
        )
    },
    // async mounted() {
    //   await this.getClients()
    // },
    methods: {
        ...mapActions(useClientStore, {
            deleteClient: 'deleteItem',
            getClients: 'getItems'
        })
    }
}
</script>