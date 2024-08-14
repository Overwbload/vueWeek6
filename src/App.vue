<template>
  <RouterView />
</template>

<script>
export default {}
</script>

<style>
.loader {
  width: 120px;
  aspect-ratio: 1;
  background: linear-gradient(#dc1818 0 0) bottom/100% 0% no-repeat #ccc;
  -webkit-mask:
    radial-gradient(circle at 60% 65%, #000 62%, #0000 65%) top left,
    radial-gradient(circle at 40% 65%, #000 62%, #0000 65%) top right,
    linear-gradient(to bottom left, #000 42%, #0000 43%) bottom left,
    linear-gradient(to bottom right, #000 42%, #0000 43%) bottom right;
  -webkit-mask-size: 50% 50%;
  -webkit-mask-repeat: no-repeat;
  animation: l19 1.2s infinite linear;
}

@keyframes l19 {

  90%,
  100% {
    background-size: 100% 100%
  }
}

span.page-link {
  background-color: rgb(181, 232, 181) ;
}
</style>
