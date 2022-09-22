---
title: 'Markdown + Tailwind'
layout: ../layouts/main.astro
setup: |
  import Button from '../components/Button.astro';
---

<div class="grid place-items-center h-screen content-center">
    <Button>Tailwind Button in Markdown!</Button>
    <a href="/" class="p-4 underline">Go home...</a>
</div>
