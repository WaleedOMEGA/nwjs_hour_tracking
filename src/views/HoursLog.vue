<template>
  <b-container class="hours-log-page">
    <b-row>
      <b-col>
        <b-row class="mt-5 mb-4">
          <b-col>
            <h1>Hours Log</h1>
          </b-col>
          <b-col>
            <b-btn variant="primary" @click="$router.push({name: 'TimeEntry'})">
              + Add Entry
            </b-btn>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-table
              striped
              hover
              :fields="fields"
              :items="entries"
            />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import moment from 'moment';

export default {
  name: 'HoursLog',
  components: {
  },
  // eslint-disable-next-line no-restricted-syntax
  data () {
    return {
      fields: ['project.label', 'startDate', 'endDate']
    };
  },
  methods: {
    ...mapActions(['readTimeEntries'])
  },
  computed: {
    ...mapState(['timeEntries']),
    // eslint-disable-next-line no-restricted-syntax
    entries () {
      return this.timeEntries.map((entry) => {
        return {
          ...entry,
          endDate: moment(entry.endDate).format('MMMM Do YYYY, h:mm a'),
          startDate: moment(entry.startDate).format('MMMM Do YYYY, h:mm a')
        };
      });
    }
  },
  // eslint-disable-next-line no-restricted-syntax
  mounted () {
    this.readTimeEntries();
  }
};
</script>
