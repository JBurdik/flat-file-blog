<template>
  <form @submit.prevent="submit">
    <div class="form-group row mb-4">
      <div class="col-sm-12 form-group mb-4">
        <input
          type="text"
          class="form-control"
          :class="errors.username && 'is-invalid'"
          v-model="username"
          @keyup="validate('username')"
        />

        <div class="invalid-feedback" v-if="errors.username">
          {{ errors.username }}
        </div>
      </div>

      <div class="col-sm-12 form-group mb-4">
        <input
          type="password"
          class="form-control"
          :class="errors.password && 'is-invalid'"
          v-model="password"
          @keyup="validate('password')"
        />
        <div class="invalid-feedback" v-if="errors.password">
          {{ errors.password }}
        </div>
      </div>
    </div>

    <div class="form-group row mb-4">
      <div class="col-sm-12">
        <button type="submit" class="btn btn-primary">
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
            v-if="isLoading"
          ></span>
          {{ isLoading ? "Odesílám..." : "Odeslat" }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    username: "nette",
    password: "framework",
    errors: {
      username: null,
      password: null,
    },
    isLoading: false,
  }),
  methods: {
    async submit() {
      if (this.isLoading) return; // nepokracovat pokud se jiz form odesila
      if (!this.validate("all")) return; // nepokracovat pokud validace neprojde

      const response = await fetch(
        `/auth?username=${this.username}&password=${this.password}`,
        {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
          method: "POST",
        }
      );
      const json = await response.json();

      if (json.success) {
        // Uspesny login
        return (window.location.href = "/");
      }

      
    },
    /**
     * Validace formulare
     * @param {String} which
     */
    validate(which) {
      /**
       * Validace username
       * Podminky
       * - je
       * - min 5 znaku
       */
      const username = () => {
        const is = this.username && this.username.length >= 5; // required a minLength je 5

        // Pokud neni problem, error se nastavi na null, jinak na chybu
        this.errors.username = is
          ? null
          : "Uživatelské jméno musí mít nejméně 5 znaků.";

        return is;
      };

      /**
       * Validace password
       * Podminky
       * - je
       * - min 5 znaku
       */
      const password = () => {
        const is = this.password && this.password.length >= 5; // required a minLength je 5

        // Pokud neni problem, error se nastavi na null, jinak na chybu
        this.errors.password = is ? null : "Heslo musí mít nejméně 5 znaků.";

        return is;
      };

      switch (which) {
        case "username":
          return username();
        case "password":
          return password();
        case "all":
        default:
          return username() && password(); // that both username & password are true
      }
    },
  },
});
</script>