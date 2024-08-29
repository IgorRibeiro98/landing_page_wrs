<template>
	<v-sheet width="100%" height="100%">
		<v-row>
			<v-col cols="12" class="d-flex  align-center">
				<Avatar :user="user" size="80" initialsClass="text-h3" @mouseover="overlay = true"
					@mouseleave="overlay = false">
				</Avatar>
				<span class="text-h4 font-weight-semi-bold ml-4">{{ user.name }}</span>
			</v-col>
			<v-col cols="12">
				<div class="mb-6">
					<span class="font-weight-bold text-h6">
						Informações pessoais
					</span>
				</div>
				<v-form @submit.prevent="update" v-model="validate" lazy-validation ref="formElement">
					<Form v-model="selfUpdateUser" :form="form"></Form>
					<div class="mt-6">
						<v-btn color="primary" type="submit" :loading="loading">Salvar Alterações</v-btn>
					</div>
				</v-form>

			</v-col>
		</v-row>
	</v-sheet>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { updateSelf, confirmUserPassword } from '@/modules/management/repositories/user.repository'
import useUserStore from "@/stores/user";
import Avatar from '@/components/Avatar.vue'
import Form from '@/components/FormBuilder/Form.vue'

interface SelfUpdateUser extends User {
	newPassword: string
	newPasswordConfirmation: string
}

const userStore = useUserStore()

const { user } = storeToRefs(useUserStore());

const isUpdatingPassword = computed(() => {
	return selfUpdateUser.value.newPassword !== '' || selfUpdateUser.value.newPasswordConfirmation !== ''
})

const selfUpdateUser = ref<SelfUpdateUser>({
	...user.value,
	newPassword: '',
	newPasswordConfirmation: ''
})
const formElement = ref<any>(null)
const loading = ref(false)
const validate = ref(false)
const showPass = ref({
	current: false,
	new: false,
	confirm: false
})

const form = computed<any>(() => {
	return [

		{
			label: 'Nome',
			value: 'name',
			component: 'VTextField',
			required: true,
			cols: { cols: 12, md: 4 },
		},
		{
			label: 'E-mail',
			value: 'email',
			component: 'VTextField',
			cols: { cols: 12, md: 4 },
			props: {
				disabled: true
			}
		},
		{
			value: 'void',
			component: 'VTextField',
			cols: { cols: 12, md: 4 },
			props: {
				class: 'd-none'

			}
		},
		{
			label: 'Senha atual',
			// label: 'Alterar senha',
			value: 'password',
			component: 'VTextField',
			required: isUpdatingPassword.value,
			cols: { cols: 12, md: 4 },
			props: {
				rules: isUpdatingPassword.value ? [validateUserCurrentPassword] : '',
				appendInnerIcon: showPass.value.current ? 'mdi-eye-outline' : 'mdi-eye-off-outline',
				type: showPass.value.current ? 'text' : 'password',
			},
			on: {
				'click:append-inner': () => { showPass.value.current = !showPass.value.current }
			}
		},
		{
			label: 'Nova senha',
			// label: 'Alterar senha',
			value: 'newPassword',
			component: 'VTextField',
			required: isUpdatingPassword.value,
			cols: { cols: 12, md: 4 },
			props: {
				appendInnerIcon: showPass.value.new ? 'mdi-eye-outline' : 'mdi-eye-off-outline',
				type: showPass.value.new ? 'text' : 'password',
				rules: isUpdatingPassword.value ? [newPasswordMustBeDifferent, 'password'] : ''
			},
			on: {
				'click:append-inner': () => { showPass.value.new = !showPass.value.new }
			}
		},
		{
			label: 'Confirmar senha',
			// label: 'Repetir senha',
			value: 'newPasswordConfirmation',
			component: 'VTextField',
			required: isUpdatingPassword.value,
			cols: { cols: 12, md: 4 },
			props: {
				appendInnerIcon: showPass.value.confirm ? 'mdi-eye-outline' : 'mdi-eye-off-outline',
				type: showPass.value.confirm ? 'text' : 'password',
				rules: isUpdatingPassword.value ? `equals:${selfUpdateUser.value.newPassword}|password` : ''
			},
			on: {
				'click:append-inner': () => { showPass.value.confirm = !showPass.value.confirm }
			}
		},
	]
}
);

function update() {
	formElement.value.validate().then((resp) => {
		if (resp.valid) {
			loading.value = true
			updateSelf(selfUpdateUser.value)
				.then(() => {
					userStore.loadUser()
					// successMessage('Usuário atualizado com sucesso')
				})
				.catch((error) => {
					console.error(error)
					// errorMessage('Falha ao atualizar usuário')
				})
				.finally(() => {
					loading.value = false
					selfUpdateUser.value.password = ''
					selfUpdateUser.value.newPassword = ''
					selfUpdateUser.value.newPasswordConfirmation = ''
				})
		}
	})

}

function newPasswordMustBeDifferent() {
	return selfUpdateUser.value.newPassword !== selfUpdateUser.value.password ? true : "Nova senha deve ser diferente da senha atual";
}

async function validateUserCurrentPassword() {
	const response = await confirmUserPassword(selfUpdateUser.value.password);
	return response.data ? true : "Senha inválida";
}


</script>
<style scoped lang="scss"></style>