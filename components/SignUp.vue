<template>
<h3 class="text-3xl text-center text-gray-700">
    Sign Up
</h3>
<form class="w-full">
    <div class="mb-5">
        <label for="fullname" class="block mb-2 text-gray-700">Fullname</label>
        <input type="text" id="fullname" class="bg-gray-50 border border-gray-300 text-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your fullname" required />
    </div>
    <div class="mb-5">
        <label for="email" class="block mb-2 text-gray-700">Email</label>
        <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your email" required />
    </div>
    <div class="mb-5">
        <label for="password" class="block mb-2 text-gray-700">Password</label>
        <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your password" required />
    </div>
    <div class="mb-5">
        <label for="confirmPassword" class="block mb-2 text-gray-700">Confirm Password</label>
        <input type="password" id="confirmPassword" class="bg-gray-50 border border-gray-300 text-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Re-enter your password" required />
    </div>
    <button type="submit" class="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 rounded-lg px-5 py-2.5 text-center w-full">Agree & Join</button>
</form>
<p class="text-sm text-gray-500 mt-3">By clicking <b>Agree & Join</b>, you agree to the <a href="https://www.popules.com/files/Privacy_Policy_for_Popules.pdf" target="_blank" class="underline">Privacy Policy</a>.</p>
</template>
