<div class="w-screen flex">
	<div class="h-screen w-[22rem] lg:w-[28rem] bg-primary" />
	<div class="flex justify-center w-full">
		<div class="main-container padding flex flex-col justify-center">
			<h1 class="text-2xl mb-8">Log Into Your Account</h1>
			<form method="POST" action="?/login" class="space-y-4">
				<div>
					<label for="email">Email</label>
					<input type="email" name="email" class="input" />
				</div>
				<div>
					<label for="password">Password</label>
					<input type="password" name="password" class="input" />
				</div>
				<button class="btn">Login</button>
			</form>
		</div>
	</div>
</div>
