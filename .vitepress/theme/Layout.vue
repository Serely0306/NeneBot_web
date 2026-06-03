<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { watch, onMounted, nextTick } from 'vue'

const { Layout } = DefaultTheme
const { isDark, page } = useData()

const syncTheme = (dark) => {
  if (typeof document === 'undefined') return
  const theme = dark ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('nenebot-theme', theme)
}

watch(isDark, (dark) => syncTheme(dark))

onMounted(() => {
  syncTheme(isDark.value)
  const stored = localStorage.getItem('nenebot-theme')
  if (stored === 'light' || stored === 'dark') {
    document.documentElement.setAttribute('data-theme', stored)
  }
})

onMounted(() => {
  nextTick(() => {
    const revealEls = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' })
    for (const el of revealEls) observer.observe(el)
  })
})

function initCollapsibleOutline() {
  const outline = document.querySelector('.VPDocAsideOutline')
  if (!outline) return
  const topLevel = outline.querySelector(':scope > div > ul')
  if (!topLevel) return
  for (const li of topLevel.querySelectorAll(':scope > li')) {
    const childUl = li.querySelector(':scope > ul')
    if (!childUl) continue
    const link = li.querySelector(':scope > .outline-link')
    if (!link) continue
    li.classList.add('has-children', 'collapsed')
    link.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      li.classList.toggle('collapsed')
    })
  }
}

onMounted(() => {
  nextTick(() => {
    initCollapsibleOutline()

    // re-run after VitePress route change
    const observer = new MutationObserver(() => initCollapsibleOutline())
    const outline = document.querySelector('.VPDocAsideOutline')
    if (outline) observer.observe(outline, { childList: true, subtree: true })
  })
})

if (typeof window !== 'undefined') {
  let ticking = false
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const nav = document.getElementById('VPContent')
        if (nav) {
          nav.classList.toggle('is-scrolled', window.scrollY > 16)
        }
        ticking = false
      })
      ticking = true
    }
  }, { passive: true })
}

function flashPluginTarget(hash) {
  if (!hash || !hash.startsWith('#pl-')) return
  const el = document.querySelector(hash)
  if (!el) return

  document.querySelectorAll('.cmd-details.flash').forEach(e => e.classList.remove('flash'))

  if (el.tagName === 'DETAILS') {
    el.open = true
  }

  void el.offsetWidth
  el.classList.add('flash')
  setTimeout(() => el.classList.remove('flash'), 2300)

  setTimeout(() => {
    const top = el.getBoundingClientRect().top + window.scrollY - 90
    window.scrollTo({ top, behavior: 'smooth' })
  }, 60)
}

if (typeof window !== 'undefined') {
  let _suppressHash = false

  onMounted(() => {
    nextTick(() => {
      if (location.hash) flashPluginTarget(location.hash)

      document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
          const hash = this.getAttribute('href')
          const target = document.querySelector(hash)
          if (target) {
            e.preventDefault()
            flashPluginTarget(hash)
            _suppressHash = true
            location.hash = hash
          }
        })
      })

      window.addEventListener('hashchange', () => {
        if (_suppressHash) {
          _suppressHash = false
          return
        }
        flashPluginTarget(location.hash)
      })
    })
  })
}
</script>

<template>
  <div class="nenebot-app">
    <div class="bg-layer" aria-hidden="true">
      <div class="bg-orb bg-orb--1"></div>
      <div class="bg-orb bg-orb--2"></div>
      <div class="bg-orb bg-orb--3"></div>
      <div class="bg-orb bg-orb--4"></div>
      <div class="bg-grid"></div>
    </div>
    <Layout />
  </div>
</template>
