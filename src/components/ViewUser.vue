<template>
  <div class="view-user">
    <div class="jumbotron jumbotron-fluid">
      <div class="container text-center">
        <h2 class="display-4">{{ user.first_name }} {{ user.last_name }}</h2>
      </div>
    </div>
    <div class="container">
      <div class="row">
          <div class="col-sm-4 offset-sm-4">
            <div class="card">
                <div v-if="user.city" class="card-header">
                    {{ user.city }} {{ user.country }}
                </div>
                <div class="card-body">
                    <h5 class="card-title">{{ user.first_name }} {{ user.last_name }}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{{ user.email }}</h6>
                    <p v-if="user.phone_number" class="card-text mb-0">{{ user.phone_number }}</p>
                    <p v-if="user.address" class="card-text">{{ user.address }}</p>
                </div>
            </div>
            <div class="text-center">
                <router-link to="/" class="btn btn-info btn-sm mt-4">Back</router-link>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewUser',
  data() {
      return {
          user: {},
      }
  },
  methods: {
      fetchUser(id) {
        this.$http.get('http://localhost:3000/users/' + id)
        .then(function(response){
            this.user = response.body;
        });
      }
  },
  created: function(){
    this.fetchUser(this.$route.params.id);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
