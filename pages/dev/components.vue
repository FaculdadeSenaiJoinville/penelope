<template>
	<section>
		<OCard class="space-bottom">
			<OInput
				v-model="user.name"
				text
				name="name"
				label="Nome"
				required
			/>

			&lt;OInput v-model="user.name" label="Nome" required />
		</OCard>

		<OCard class="space-bottom">
			<OInput
				v-model="user.age"
				number
				name="age"
				label="Idade"
			/>

			&lt;OInput label="Idade" />
		</OCard>

		<OCard class="space-bottom">
			<OSearchBar v-model="teste" :action="logTeste" />

			&lt;OSearchBar v-model="teste" :action="logTeste" />
		</OCard>

		<OCard class="space-bottom">
			<OSelectList
				v-model="user.type"
				item-key="key"
				item-name="name"
				:options="types"
			/>

			{{ user.type }}

			&lt;OSearchBar v-model="teste" :action="logTeste" />
		</OCard>

		<OCard class="space-bottom">
			<OButton success>
				Botão Success
			</OButton>

			&lt;OButton success>Botão Success&lt;/OButton>
		</OCard>

		<OCard class="space-bottom">
			<OButton info>
				Botão Info
			</OButton>

			&lt;OButton info>Botão Info&lt;/OButton>
		</OCard>

		<OCard class="space-bottom">
			<OButton danger>
				Botão Danger
			</OButton>

			&lt;OButton danger>Botão Danger&lt;/OButton>
		</OCard>

		<OCard>
			<OActionButton :buttons="buttons" />

			&lt;OActionButton :buttons="buttons" />
		</OCard>
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

	export default Vue.extend({
		components: {
			OInput,
			OSearchBar,
			OSelectList,
			OButton,
			OActionButton,
			OCard
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
