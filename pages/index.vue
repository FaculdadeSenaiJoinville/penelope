<template>
	<AdminDashboard v-if="$auth.user.type === UserType.ADMIN" />

	<ProfessorDashboard v-else-if="$auth.user.type === UserType.PROFESSOR" />

	<UserDashboard v-else-if="$auth.user.type === UserType.STUDENT" />
</template>

<script lang="ts">
	import Vue from 'vue';
	import { UserType } from '~/types/entities/user.type';
	import AdminDashboard from '~/components/dashboards/AdminDashboard.vue';
	import ProfessorDashboard from '~/components/dashboards/ProfessorDashboard.vue';
	import UserDashboard from '~/components/dashboards/UserDashboard.vue';

	export default Vue.extend({
		components: {
			AdminDashboard,
			ProfessorDashboard,
			UserDashboard
		},

		data() {
			return {
				UserType
			};
		}
	});
</script>
