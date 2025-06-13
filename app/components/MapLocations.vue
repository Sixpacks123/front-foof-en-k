<template>
  <section id="locations" class="my-16">
    <h2 class="text-2xl font-bold mb-4">Nos points de localisation & horaires</h2>
    <div class="flex flex-col md:flex-row gap-8">
      <div class="flex-1 min-w-[300px]">
        <!-- Exemple d'intégration Google Maps, à personnaliser -->
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9999999999995!2d2.292292615674471!3d48.85837307928744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fddf1e1e1e1%3A0x1a1a1a1a1a1a1a1a!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1710000000000!5m2!1sfr!2sfr"
          width="100%"
          height="300"
          style="border:0;"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div class="flex-1 min-w-[200px]">
        <h3 class="text-xl font-semibold mb-2">Horaires d'ouverture</h3>
        <ul>
          <li>Lundi - Vendredi : 11h30 - 14h30 / 18h30 - 22h</li>
          <li>Samedi : 12h - 23h</li>
          <li>Dimanche : Fermé</li>
        </ul>
        <p class="mt-4 text-sm text-gray-500">Retrouvez-nous sur nos différents emplacements chaque semaine !</p>
      </div>
    </div>
  </section>
</template>