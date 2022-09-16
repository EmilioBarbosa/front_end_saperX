<template>
  <div>
    <div class="row d-flex justify-center">
      <div class="col-12 col-md-6 q-mt-lg q-ml-lg">
        <q-list bordered>
          <q-item v-for="contact in contatos" :key="contact.id" class="q-my-sm"  v-ripple>
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  {{contact.name.substring(0,1).toUpperCase()}}
                </q-avatar>
              </q-item-section>

              <q-item-section @click="selecionaContato(contact)" class="cursor-pointer" >
                <q-item-label>{{ contact.name }}</q-item-label>
                <q-item-label caption lines="1">{{ contact.number }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-btn icon="add_ic_call" size="sm" color="green" @click="addUserPhone(contact)" />
              </q-item-section>
              <q-item-section side>
                <q-btn icon="edit" color="blue" size="sm" @click="updateUser(contact)"/>
              </q-item-section>
              <q-item-section side>
                <q-btn icon="delete" color="red" size="sm" @click="deleteUser(contact)"/>
              </q-item-section>

          </q-item>
        </q-list>
      </div>
      <!-- Componente para Adicionar novo contato -->
      <AddUpdatePhone :key="keyAddPhone" :dialogActive="dialogAddPhoneActive" :userSelected="userSelected"/>
      <!-- Componente para editar contato -->
      <UpdateContact @getContacts="getContacts" :key="keyUpdateUser" :dialogActive="dialogUpdateUserActive" :userSelected="userSelected"/>
      <!-- Componente para deletar contato -->
      <DeleteContactPhone @getContacts="getContacts" :key="keyDeleteUser" :dialogActive="dialogDeleteUserActive" :userSelected="userSelected"/>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import axios from "axios";
import AddUpdatePhone from "components/AddUpdatePhone.vue";
import UpdateContact from "components/UpdateContact.vue";
import DeleteContactPhone from "components/DeleteContactPhone.vue";

export default defineComponent({
  name: "ListaContatos",
  components: {
    AddUpdatePhone,
    UpdateContact,
    DeleteContactPhone
  },
  data(){
    return {
      contatos: null,
      userSelected: null,
      dialogUpdateUserActive: false,
      dialogAddPhoneActive: false,
      dialogDeleteUserActive: false,
      keyUpdateUser: 0,
      keyDeleteUser: 0,
      keyAddPhone: 0
    }
  },
  methods: {
    selecionaContato(item){
      //função para mostrar o contato e os seus números
      //utiliza o método push do vue router, com o id do contato
      this.$router.push(`/contact/${item.id}`)
    },
    addUserPhone(item){
      //função para ativar o componente AddUpdatePhone
      //No clique ela guarda as informações do contato na variável userSelected
      //a variável dialogAddPhoneActive recebe true e a key do componente é atualizada
      // para ele renderizar com os valores atualizados
      this.userSelected = item
      this.dialogAddPhoneActive = true
      this.keyAddPhone += 1
    },
    updateUser(item){
      //função para ativar o componente UpdateUser
      //No clique ela guarda as informações do contato na variável userSelected
      //a variável dialogUpdateUserActive recebe true e a key do componente é atualizada
      // para ele renderizar com os valores atualizados
      this.userSelected = item
      this.dialogUpdateUserActive = true
      this.keyUpdateUser += 1
    },
    deleteUser(item){
      //função para ativar o componente dialogDeleteUserActive
      //No clique ela guarda as informações do contato na variável userSelected
      //a variável dialogDeleteUserActive recebe true e a key do componente é atualizada
      // para ele renderizar com os valores atualizados
      this.userSelected = item
      this.dialogDeleteUserActive = true
      this.keyDeleteUser += 1
    },
    getContacts(){
      //função para buscar os contatos na api
      axios.get('http://localhost:8000/api/users')
        .then((e) => {
          this.contatos = e.data
        })
        .catch((e) => {
          alert(e)
        })
    }
  },
  mounted() {
    //quando o componente é montado ele chama a função para buscar os contatos
    this.getContacts()
  }
})
</script>

<style scoped>

</style>
