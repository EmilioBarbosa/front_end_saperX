<template>
  <div>
    <div class="row d-flex justify-center q-mt-lg">
      <div class="col-12 col-md-6 text-center">
        <q-btn icon="person" @click="dialogAddContact = true">Adicionar Contato</q-btn>
      </div>
    </div>
    <q-dialog v-model="dialogAddContact">
      <q-card style="width: 800px">
        <div class="row">
          <div class="col-12">
            <q-card-section>
              <div class="text-h6">Adicionar Contato</div>
            </q-card-section>
          </div>
        </div>

        <form>
          <q-card-section class="q-pt-none">
            <q-input outlined v-model="name" ref="nameRef" :rules="[val => !!val || 'Campo obrigatório']" label="Nome" />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input outlined v-model="number" unmasked-value mask="(##)#####-####" label="Número de telefone" />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancelar" v-close-popup />
            <q-btn flat label="Adicionar" v-close-popup @click="addContact"/>
          </q-card-actions>
        </form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import axios from "axios";
//Plugin para notificações do Quasar
import useNotify from "src/composables/UseNotify.js";

export default defineComponent({
  name: "AddContact",
  setup(){
    //as funções de notificações de sucesso e erro
    const { notifySucess, notifyError } = useNotify()
    return {
      notifySucess,
      notifyError
    }
  },
  data(){

    return {
      dialogAddContact: false,
      name:'',
      number: '',
      nameRef: null
    }
  },
  methods:{
    addContact(){
      //Função para adicionar contatos, caso retorne sucesso, mostra notificação
      // e emite 'getContacts' para atualizar a lista de contatos
      //caso retorne erro mostra notificação de erro
      axios.post('http://localhost:8000/api/users', {
          'name': this.name,
          'number': this.number
        }).then(response=>{
          this.notifySucess('Contato adicionado')
          this.$emit('getContacts')
        }).catch(response=>{
          this.notifyError('Ocorreu um erro ao adicionar o contato')
        })
    }
  }
})
</script>

<style scoped>

</style>
