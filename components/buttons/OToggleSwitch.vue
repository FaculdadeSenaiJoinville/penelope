<template>
	<section :class="inputClasses">
		<div class="o-input-label">
			<label v-if="label" :for="name">{{ label }}</label>

			<span v-if="label && required" class="o-input-required-symbol">*</span>
		</div>

		<label :class="{'active': value}" class="o-switch-button">
			<input
				id="switch_toggle"
				:value="value"
				:name="name"
				:aria-label="label"
				type="checkbox"
				:disabled="disabled"
				:required="required"
				class="input"
				@click="$emit('input', !value);"
			/>

			<span class="toggle__switch" />
		</label>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		props: {
			disabled: { type: Boolean, default: false },
			value: { type: Boolean, default: false },
			name: { type: String, required: true },
			label: { type: String, default: '' },
			required: { type: Boolean, default: false }
		},

		computed: {
			inputClasses(): string {
				const classes = ['o-input'];

				return classes.join(' ');
			}
		}
	});
</script>

<style scoped>
	.o-switch-button {
		vertical-align: middle;
		user-select: none;
		cursor: pointer;
	}

	.o-switch-button input[type="checkbox"] {
		opacity: 0;
		position: absolute;
		width: 1px;
		height: 1px;
	}

	.o-switch-button .toggle__switch {
		display:inline-block;
		height:22px;
		border-radius:20px;
		width:62px;
		background: #BFCBD9;
		box-shadow: inset 0 0 1px #BFCBD9;
		position:relative;
		transition: all .25s;
		align-content: center;
	}

	.o-switch-button .toggle__switch::after,
	.o-switch-button .toggle__switch::before {
		content: "";
		position: absolute;
		display: block;
		height: 12px;
		width: 26px;
		border-radius: 35px;
		left: 8px;
		top: 5px;
		transform: translateX(0);
		transition: all .25s cubic-bezier(.5, -.6, .5, 1.6);
	}

	.o-switch-button .toggle__switch::after {
		background: var(--white);
	}

	.o-switch-button .toggle__switch::before {
		opacity:0;
	}

	.active .toggle__switch {
		background: var(--green);
		box-shadow: inset 0 0 1px var(--green);
	}

	.active .toggle__switch::after,
	.active .toggle__switch::before{
		transform:translateX(40px - 18px);
	}

	.active .toggle__switch::after {
		left: 28px;
		background: var(--white);
	}

	.o-input-label {
		margin-bottom: 0.3rem;
		color: var(--gray-dark-2);
		font-weight: 600;
	}

	.o-input {
		display: flex;
		flex-direction: column;
		text-align: left;
		width: 220px !important;
	}

	.o-input input {
		width: 100%;
	}

	.o-input-required-symbol {
		color: var(--red);
	}
</style>
