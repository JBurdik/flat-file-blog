<template>
  <form class="d-flex">
    <div class="ml-5">
      <input
        class="form-control mr-2"
        @focus="shown = true"
        @focusout="shown = false"
        @keyup="search"
        v-model="query"
        type="search"
        placeholder="Vyhledej příspěvek..."
        aria-label="Vyhledej příspěvek..."
        style="width: 100%"
      />
      <ul
        class="dropdown-menu search-dropdown"
        :class="results.length >= 1 && shown && 'show'"
        role="menu"
        style="left: unset !important"
      >
        <a
          class="dropdown-item"
          v-for="(result, i) in results"
          :href="'/blog/' + result.slug"
          :key="i"
        >
          {{ result.title }}
        </a>
      </ul>
    </div>
  </form>
</template>

<script>
export default {
  data: () => ({
    shown: false,
    results: [],
    query: "",
    lastSearch: "",
    isLoading: false,
  }),
  methods: {
    async search() {
      // nechceme novy request kdyz uz nacitame
      if (this.isLoading)
        return setTimeout(() => {
          // zkusime za 5ms, aby potom user necekal donekonecna protoze se hledani zrusilo
          if (this.lastSearch !== this.query) this.search();
        }, 5);

      // nechceme prazdne queries, zaroven nastavime na prazdne results protoze nic nehledame
      if (this.query.replace(/\s/g, "").length < 1) return (this.results = []);

      this.isLoading = true;
      this.lastSearch = this.query;

      const response = await fetch(`/article/search?query=${this.query}`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest", // Potreba aby Nette $presenter->isAjax() fungovalo s fetchem
        },
      });

      const json = await response.json();
      this.results = json.results;

      this.isLoading = false;
    },
  },
};
</script>