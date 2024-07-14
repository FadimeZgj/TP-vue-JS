<template>
    <div>
        <div class="client" v-if="!loading && client">
            <div class="row border-bottom pb-3 mb-3">
                <div class="col">
                    <h1 v-if="isNewClient" class="h3">
                        <i class="fa-solid fa-angle-down me-2" />Créer un client
                    </h1>
                    <h1 v-else class="h3"><i class="fa-solid fa-angle-down me-2" />Editer un client</h1>
                </div>
                <div v-if="!isNewClient" class="col text-end">
                    <button @click="onDeleteClient(client)" class="btn btn-outline-danger">
                        <i class="fa-solid fa-trash me-2" />
                        Supprimer le client
                    </button>
                </div>
            </div>

            <div class="alert alert-danger my-3" v-if="error">Un champ requière votre attention</div>

            <h2>Contact</h2>

            <div class="col d-sm-flex justify-content-between gap-3">
                <div class="form-floating mb-3 w-100">
                    <input type="text" name="firstname" id="firstname" v-model="client.firstName" class="form-control"
                        placeholder="Prénom" :class="{ 'is-invalid': !client.firstName }" />
                    <label for="firstname" class="form-label">Prénom</label>
                </div>
                <div class="form-floating mb-3 w-100">
                    <input type="text" name="laststname" id="lastname" v-model="client.lastName" class="form-control"
                        placeholder="Nom" :class="{ 'is-invalid': !client.lastName }" />
                    <label for="lastname" class="form-label">Nom</label>
                </div>
                <div class="form-floating mb-3 w-100">
                    <input type="date" name="date" id="date" class="form-control" placeholder="Date" format="yyyy-MM-dd"
                        v-model="client.date" :class="{ 'is-invalid': !client.date }" />
                    <label for="date" class="form-label">Crée le</label>
                </div>
            </div>
            <div class="col-12 d-sm-flex gap-3">
                <div class="form-floating mb-3 w-100">
                    <input type="text" name="job" id="job" v-model="client.job" class="form-control"
                        placeholder="Fonction" :class="{ 'is-invalid': !client.job }" />
                    <label for="job" class="form-label">Fonction</label>
                </div>
                <div class="form-floating mb-3 w-100">
                    <input type="text" name="phone" id="phone" v-model="client.phone" class="form-control"
                        placeholder="Téléphone" :class="{ 'is-invalid': !client.phone }" />
                    <label for="phone" class="form-label">Téléphone</label>
                </div>
            </div>
            <div class="form-floating mb-3 w-100">
                <input type="text" name="email" id="email" v-model="client.email" class="form-control"
                    placeholder="Email" :class="{ 'is-invalid': !client.email }" />
                <label for="email" class="form-label">Email</label>
            </div>
            <div class="form-floating mb-3 w-100">
                <input type="text" name="companyname" id="companyname" v-model="client.companyName" class="form-control"
                    placeholder="Entreprise" :class="{ 'is-invalid': !client.companyName }" />
                <label for="companyname" class="form-label">Entreprise</label>
            </div>

            <h2>Coordonnées</h2>

            <div class="form-floating mb-3 w-100">
                <input type="text" name="address1" id="address1" v-model="client.address1" class="form-control"
                    placeholder="Adresse 1" :class="{ 'is-invalid': !client.address1 }" />
                <label for="address1" class="form-label">Adresse 1</label>
            </div>
            <div class="form-floating mb-3 w-100">
                <input type="text" name="address2" id="address2" v-model="client.address2" class="form-control"
                    placeholder="Adresse 2" />
                <label for="address2" class="form-label">Adresse 2</label>
            </div>

            <div class="col-12 d-sm-flex gap-3">
                <div class="form-floating mb-3 w-100">
                    <input type="text" name="zip" id="zip" v-model="client.zip" class="form-control"
                        placeholder="Code postal" :class="{ 'is-invalid': !client.zip }" />
                    <label for="zip" class="form-label">Code Postal</label>
                </div>
                <div class="form-floating mb-3 w-100">
                    <input type="text" name="city" id="city" v-model="client.city" class="form-control"
                        placeholder="Ville" :class="{ 'is-invalid': !client.city }" />
                    <label for="city" class="form-label">Ville</label>
                </div>
            </div>

            <div class="form-floating mb-3 w-50">
                <select name="country" id="country" class="form-control" placeholder="Pays" v-model="client.country"
                    :class="{ 'is-invalid': !client.country }">
                    <option value="">Veuillez selectionner un pays</option>
                    <option v-for="country in clientDetailInterface.country" :value="country" :key="country">
                        {{ country }}
                    </option>
                </select>
                <label for="country" class="form-label">Pays</label>
            </div>

            <p class="text-end">
                <button @click="onSave()" :disabled="formInvalid" class="btn btn-outline-primary btn-lg px-5">
                    <i class="fa-solid fa-save me-2" />Enregistrer
                </button>
            </p>

            <AppDebug :datas="client" />
        </div>
        <div v-else>loading...</div>
    </div>
</template>

<script>
//import { clientDetailInterface } from '@/interfaces/client'
import { clientDetailInterface } from '@/interfaces/client';
import { useClientStore } from '@/stores/client'
import { mapActions, mapState, mapWritableState } from 'pinia'
export default {
    components: {
    },
    props: {
        id: {
            type: String,
            default: 'new'
        }
    },
    data() {
        return {
            clientDetailInterface
        }
    },
    mounted() {
        // avant de monter le composant de la vue, on charge les données de la facture à éditer
        this.setClient(this.id);
        if (this.isNewClient) {
            this.initializeNewClient();
        }
    },
    computed: {
        ...mapState(useClientStore, {
            loading: 'loading'
        }),
        // le formulaire local 'client' est mappé sur la donnée du store 'item'
        // attention, pour pouvoir modifier les données d'un état du store (stae), il faut utiliser mpaWritableState plutôt que mapState (qui est pour la lecture seule)
        ...mapWritableState(useClientStore, {
            client: 'item'
        }),
        // ici on a une computed classique
        isNewClient() {
            return this.id === 'new'
        },

        formInvalid() {
            return (
                !this.client ||
                !this.client.firstName ||
                !this.client.date
            )
        },
    },
    methods: {
        // pour pouvoir appeler une action du store, il faut l'importer et ici on lui donne un nom local différent 'setClient'
        ...mapActions(useClientStore, {
            setClient: 'setItem',
            updateClient: 'updateItem',
            createClient: 'createItem',
            deleteClient: 'deleteItem'
        }),
        initializeNewClient() {
            const today = new Date().toISOString().slice(0, 10);
            this.client.date = today;
        },

        onDeleteClient() {
            this.deleteClient(this.id)
            this.$router.push({ name: 'clients' })
        },
        onSave() {
            // si j'ai une erreur dans le formulaire
            if (this.formInvalid) {
                // gestion des erreurs ici
                this.error = true
            } else {
                this.error = false
                // on appelle la méthode de sauvegarde de la donnée du store
                if (this.isNewClient) {
                    console.log('create', this.client)
                    this.createClient(this.client)
                } else {
                    console.log('update', this.client)
                    this.updateClient(this.client)
                }
                // on revient sur la page précédente
                this.$router.push({ name: 'clients' })
            }
        }
    },
    watch: {

    }
}

</script>