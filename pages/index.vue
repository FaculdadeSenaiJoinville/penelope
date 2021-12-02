<template>
	<AdminDashboard v-if="type === UserType.ADMIN" />

	<ProfessorDashboard v-else-if="type === UserType.PROFESSOR" />

	<StudentDashboard v-else-if="type === UserType.STUDENT" />
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
		},

		computed: {
			type() {
				return this.$auth.user?.type;
			}
		}
	});
</script>
