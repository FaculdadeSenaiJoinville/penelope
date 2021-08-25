<template>
	<section class="coomponents-container">
		<div class="component-row space-bottom-1">
			<OCard>
				<OInput
					v-model="user.name"
					text
					name="name"
					label="Nome"
					required
				/>
			</OCard>

			<OCard>
				<OInput
					v-model="user.age"
					number
					name="age"
					label="Idade"
				/>
			</OCard>

			<OCard>
				<OSelectList
					v-model="user.type"
					item-key="key"
					item-name="name"
					:options="types"
				/>

				{{ user.type }}
			</OCard>

			<OCard>
				<OSearchBar v-model="teste" :action="logTeste" />
			</OCard>
		</div>

		<div class="component-row space-bottom-1">
			<OCard>
				<OButton success>
					Botão Success
				</OButton>
			</OCard>

			<OCard>
				<OButton info>
					Botão Info
				</OButton>
			</OCard>

			<OCard>
				<OButton danger>
					Botão Danger
				</OButton>
			</OCard>

			<OCard>
				<OActionButton :buttons="buttons" />
			</OCard>
		</div>

		<div class="component-row">
			<OCard>
				<OActionCard icon="account-plus" description="Cadastrar um novo usuário" :action="logTeste" />
			</OCard>
		</div>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import OInput from '~/components/inputs/OInput.vue';
	import OSearchBar from '~/components/inputs/OSearchBar.vue';
	import OSelectList from '~/components/inputs/OSelectList.vue';
	import OButton from '~/components/buttons/OButton.vue';
	import OActionButton from '~/components/buttons/OActionButtons.vue';
	import OCard from '~/components/OCard.vue';
	import OActionCard from '~/components/buttons/OActionCard.vue';

	export default Vue.extend({
		components: {
			OInput,
			OSearchBar,
			OSelectList,
			OButton,
			OActionButton,
			OCard,
			OActionCard
		},

		data() {
			return {
				teste: '',

				user: {
					name: '',
					type: ''
				},

				types: [
					{ key: 'ADMIN', name: 'Administrador' },
					{ key: 'PROFESSOR', name: 'Professor' },
					{ key: 'STUDENT', name: 'Estudante' }
				],

				buttons: [
					{ icon: 'magnify', title: 'Btn Success', action: '', success: true },
					{ icon: 'magnify', title: 'Btn Info', action: '', info: true },
					{ icon: 'magnify', title: 'Btn Danger', action: '', danger: true }
				]
			};
		},

		methods: {
			logTeste() {
				console.info('sdsdsd');
			}
		}
	});
</script>

<style scoped>
	.coomponents-container {
		display: flex;
		flex-direction: column;
	}

	.component-row {
		display: flex;
		justify-content: space-around;
	}
</style>
