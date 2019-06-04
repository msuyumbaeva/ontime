<template>
    <nav class="navbar navbar-expand-md navbar-light bg-light mb-5">
    <router-link to="/" class="navbar-brand">
        <img alt="Vue logo" src="../assets/logo.png"  height="25" class="d-inline-block align-top">
    </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <router-link to="/tracking" class="nav-link">Трекинг</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/users" class="nav-link">Админпанель</router-link>
            </li>
        </ul>
        <a class="navbar-text" href="#">Выйти</a>       
    </div>    
    </nav>
</template>
