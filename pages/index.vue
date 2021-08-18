<template>
	<AdminDashboard v-if="$auth.user.type === UserType.ADMIN" />

	<ProfessorDashboard v-else-if="$auth.user.type === UserType.PROFESSOR" />

	<StudentDashboard v-else-if="$auth.user.type === UserType.STUDENT" />
</template>

<script lang="ts">
	import Vue from 'vue';
	import { UserType } from '~/types/entities/user.type';
	import AdminDashboard from '~/components/dashboards/AdminDashboard.vue';
	import ProfessorDashboard from '~/components/dashboards/ProfessorDashboard.vue';
	import StudentDashboard from '~/components/dashboards/StudentDashboard.vue';

	export default Vue.extend({
		components: {
			AdminDashboard,
			ProfessorDashboard,
			StudentDashboard
		},

		data() {
			return {
				UserType
			};
		}
	});
</script>
