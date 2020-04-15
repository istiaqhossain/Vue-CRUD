<template>
  <div class="users">
    <div class="jumbotron jumbotron-fluid">
      <div class="container text-center">
        <h2 class="display-4">Users</h2>
        <router-link to="/add-user" class="btn btn-info btn-sm mt-4">Add User</router-link>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <form class="mb-3">
            <div class="form-row">
              <div class="col">
                <input type="text" class="form-control" placeholder="Search by first name." v-model="filter.first_name">
              </div>
              <div class="col">
                <input type="text" class="form-control" placeholder="Search by last name." v-model="filter.last_name">
              </div>
              <div class="col">
                <input type="text" class="form-control" placeholder="Search by email." v-model="filter.email">
              </div>
            </div>
          </form>

          <Alert v-if="alert" v-bind:message="alert"></Alert>
          
          <div class="table-responsive">
            <table class="table table-striped mb-5">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" v-bind:key="user.id">
                  <td>{{ user.first_name }}</td>
                  <td>{{ user.last_name }}</td>
                  <td>{{ user.email }}</td>
                  <td>
                    <router-link v-bind:to="'/view-user/' + user.id" class="btn btn-info btn-sm mx-1">View</router-link>
                    <router-link v-bind:to="'/edit-user/' + user.id" class="btn btn-primary btn-sm mx-1">Edit</router-link>
                    <button v-on:click="deleteUser(user.id)" class="btn btn-danger btn-sm mx-1">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from './Alert'

export default {
  name: 'Users',
  components: {
    Alert
  },
  data() {
    return {
      api: 'http://localhost:3000/users',
      users: [],
      filter: [],
      alert: '',
    }
  },
  methods: {
    fetchUsers() {
      this.$http.get(this.api)
        .then(function(response){
          this.users = response.body;
        });
    },
    deleteUser(id) {
      // Delete Request
      this.$http.delete(this.api + '/' + id)
      .then(function(){
        this.users.splice( this.searchIndex( 'id', id, this.users ), 1 );
        
        if (this.$route.query.alert !== 'User Deleted.') {
          this.$router.push({path:'/',query:{alert:'User Deleted.'}}).catch(err => err);
        }
      });
    },
    searchIndex(key,val,arr) {
      for (var i=0; i < arr.length; i++) {
          if (arr[i][key] === val) {
              return i;
          }
      }
    }
  },
  created: function(){
    if (this.$route.query.alert) {
      this.alert = this.$route.query.alert;
    }

    this.fetchUsers();
  },
  updated: function(){
    if (this.$route.query.alert) {
      this.alert = this.$route.query.alert;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
