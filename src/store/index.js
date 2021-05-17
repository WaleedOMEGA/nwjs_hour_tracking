import Vue from 'vue';
import Vuex from 'vuex';
import PouchDB from 'pouchdb';
import RelPouch from 'relational-pouch';
import FindPouch from 'pouchdb-find';
import router from '../router';

PouchDB.plugin(RelPouch);
PouchDB.plugin(FindPouch);
let db = new PouchDB('hourTracking');
db.setSchema([
  {
    singular: 'timeEntry',
    plural: 'timeEntries',
    relations: {
      project: { belongsTo: 'project' }
    }
  },
  {
    singular: 'project',
    plural: 'projects',
    relations: {
      timeEntries: { hasMany: 'timeEntry' }
    }
  }
]);

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    timeEntries: [],
    projects: []
  },
  getters: {
    // eslint-disable-next-line no-restricted-syntax
    getProjects (state) {
      return state.projects.map((project) => {
        return {
          label: project.name,
          code: project.id
        };
      });
    }
  },
  mutations: {
    // eslint-disable-next-line no-restricted-syntax
    setTimeEntries (state, payload) {
      state.timeEntries = payload;
    },
    // eslint-disable-next-line no-restricted-syntax
    setProjects (state, payload) {
      state.projects = payload;
    }
  },
  actions: {
    // eslint-disable-next-line no-restricted-syntax
    async readTimeEntries ({ commit }) {
      const docs = await db.rel.find('timeEntry');
      console.log(docs);
      commit('setTimeEntries', docs.timeEntries);
    },
    // eslint-disable-next-line no-restricted-syntax
    async createTimeEntry ({}, payload) {
      try {
        const res = await db.rel.save('timeEntry', {
          ...payload
        });
        console.log('success', res);
        router.push({ name: 'HoursLog' });
      } catch (err) {
        console.error(err);
      }
    },
    // eslint-disable-next-line no-restricted-syntax
    async readProjects ({ commit }) {
      const docs = await db.rel.find('project');
      console.log(docs.projects);
      commit('setProjects', docs.projects);
    },
    // eslint-disable-next-line no-restricted-syntax
    async createProject ({}, payload) {
      try {
        const res = await db.rel.save('project', {
          ...payload
        });
        router.push({ name: 'Projects' });
      } catch (err) {
        console.error(err);
      }
    }
  },
  modules: {
  }
});
