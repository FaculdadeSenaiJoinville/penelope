<template>
	<label :for="id + '_button'" :class="{'active': isActive}" class="o-switch-button">
		<input
			:id="id + '_button'"
			v-model="checkedValue"
			type="checkbox"
			:disabled="disabled"
		/>
		<span class="toggle__switch" />
	</label>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		props: {
			disabled: {
				type: Boolean,
				default: false
			},

			id: {
				type: String,
				default: 'primary'
			},

			defaultState: {
				type: Boolean,
				default: false
			}
		},

		data() {
			return {
				currentState: this.defaultState
			};
		},

		watch: {
			defaultState(value: boolean): void {
				this.currentState = value;
			}
		},

		computed: {

			isActive(): boolean {
				return this.currentState;
			},

			checkedValue: {
				get(): boolean {
					return this.currentState;
				},

				set(newValue: boolean): void {
					this.currentState = newValue;
				}
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
</style>
