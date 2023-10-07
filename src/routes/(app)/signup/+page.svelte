<script lang="ts">
</script>

<div class="w-screen flex">
	<div class="h-screen w-[22rem] lg:w-[28rem] bg-primary" />
	<div class="flex justify-center w-full">
		<div class="main-container padding flex flex-col justify-center">
			<h1 class="text-2xl mb-8">Create Your Account</h1>
			<form method="POST" action="?/signup" class="space-y-4">
				<div class="w-1/2">
					<label for="firstName">First Name</label>
					<input type="text" name="firstName" class="input" />
				</div>
				<div class="w-1/2">
					<label for="lastName">Last Name</label>
					<input type="text" name="lastName" class="input" />
				</div>
				<div>
					<label for="email">Email</label>
					<input type="email" name="email" class="input" />
				</div>
				<div>
					<label for="password">Password</label>
					<input type="password" name="password" class="input" />
				</div>
				<button type="submit" class="btn">Signup</button>
			</form>
		</div>
	</div>
</div>
