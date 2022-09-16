<template>
  <q-page>
    <!--componente para adicionar novos contatos-->
    <!-- @getContacts está chamando a função do componente ShowContacts através do $refs -->
    <AddContact @getContacts="$refs.showContacts.getContacts()"/>
    <!-- componente para mostrar os contatos -->
    <ShowContacts ref="showContacts"/>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import ShowContacts from "components/ShowContacts.vue";
import AddContact from "components/AddContact.vue";

export default defineComponent({
  name: 'HomePage',
  components: {
    ShowContacts,
    AddContact
  },
})
</script>
