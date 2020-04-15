<template>
  <div class="edit-user">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h2 class="display-4 text-center">Edit User</h2>
      </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-sm-6 offset-sm-3">
                <Alert v-if="alert" v-bind:message="alert"></Alert>
                <div class="card mb-5">
                    <div class="card-body">
                        <form v-on:submit="updateUser">
                            <div class="form-group">
                                <label for="first_name">First Name</label>
                                <input type="text" class="form-control" id="first_name" ref="first_name" v-model="user.first_name">
                            </div>
                            <div class="form-group">
                                <label for="last_name">Last Name</label>
                                <input type="text" class="form-control" id="last_name" v-model="user.last_name">
                            </div>
                            <div class="form-group">
                                <label for="email">Email address</label>
                                <input type="email" class="form-control" id="email" v-model="user.email">
                            </div>
                            <div class="form-group">
                                <label for="phone_number">Phone Number</label>
                                <input type="text" class="form-control" id="phone_number" v-model="user.phone_number">
                            </div>
                            <div class="form-group">
                                <label for="address">Address</label>
                                <input type="text" class="form-control" id="address" v-model="user.address">
                            </div>
                            <div class="form-group">
                                <label for="city">City</label>
                                <input type="text" class="form-control" id="city" v-model="user.city">
                            </div>
                            <div class="form-group">
                                <label for="country">Country</label>
                                <input type="text" class="form-control" id="country" v-model="user.country">
                            </div>
                            <button type="submit" class="btn btn-info">Update</button>
                        </form>  
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Alert from './Alert'

export default {
  name: 'EditUser',
  components: {
    Alert
  },
  data() {
      return {
          user: {},
          alert: ''
      }
  },
  methods: {
      fetchUser(id) {
        this.$http.get('http://localhost:3000/users/' + id)
        .then(function(response){
            this.user = response.body;
        });
      },
      updateUser(e) {
          e.preventDefault();
          
          if (
              !this.user.first_name 
              || !this.user.last_name 
              || !this.user.email
          ) {
             this.alert = 'Please enter required fields!';
          } else {
              let updateUser = {
                  first_name: this.user.first_name,
                  last_name: this.user.last_name,
                  email: this.user.email,
                  phone_number: this.user.phone_number,
                  address: this.user.address,
                  city: this.user.city,
                  country: this.user.country,
              };
              this.$http.put('http://localhost:3000/users/' + this.$route.params.id ,updateUser)
                .then(function(){
                    this.$router.push({path:'/',query:{alert:'User Updated.'}});
                });
          }
      }
  },
  created: function(){
    this.fetchUser(this.$route.params.id);
  },
  mounted: function() {
    this.$refs.first_name.focus();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
