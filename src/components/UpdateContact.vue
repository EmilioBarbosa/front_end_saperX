<template>
  <q-dialog v-model="dialogUpdateUser">
    <q-card style="min-width: 300px">
      <q-card-section>
        <div class="text-h6">Editar contato</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="name" label="Nome" autofocus @keyup.enter="prompt = false" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancelar" v-close-popup />
        <q-btn flat label="Salvar" v-close-popup @click="updateUser"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {defineComponent} from 'vue'
import axios from "axios";
import useNotify from "src/composables/UseNotify";


export default defineComponent( {
  name: "UpdateContact",
  props: {
    userSelected: Object,
    dialogActive: Boolean,
  },
  setup(){
    const { notifySucess, notifyError } = useNotify()
    return {
      notifySucess,
      notifyError
    }
  },
  data(){
    return {
      dialogUpdateUser: this.dialogActive,
      name: ''
    }
  },
  methods: {
    updateUser() {
      //função para editar o nome de um contato
      //caso sucesso, mostra notificação de sucesso e emite getContacts para atualizar a lista
      //caso erro, mostra notificação com o erro
      axios.put(`http://localhost:8000/api/users/${this.userSelected.id}`, {
        'name': this.name
      }).then(response => {
        this.notifySucess(`Contato editado com sucesso`)
        this.$emit('getContacts')
      }).catch(response => {
        this.notifyError(`Ocorreu um erro ao editar o contato`)
      })
    }
  }
})
</script>

<style scoped>

</style>
