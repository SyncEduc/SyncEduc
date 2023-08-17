<template>
    <NuxtLayout name="nav">
        <div class="HomeContainer">
            <section class="SectionWelcome">

            </section>
            <section class="SectionRasson">
                <h1>
                    Por que escolher nossos cursos?
                </h1>
                <div>
                    <RassonItem v-for="(item, index) in rassons" :key="index">
                        <template #image>
                            <img id="img" :src="item.img">
                        </template>
                        <template #title>
                            <h1 id="title"> {{ item.title }}</h1>
                        </template>
                        <template #desc>
                            <p class="RassonDesc" id="desc">{{ item.desc }}</p>
                        </template>
                    </RassonItem>
                </div>
            </section>

        </div>
    </NuxtLayout>
</template>
<script setup>
import know from '../assets/images/know.png'
import clock from '../assets/images/clock.png'
import diversity from '../assets/images/diversidade.png'
import commnity from '../assets/images/community.png'
import certificate from '../assets/images/certificate.png'
const rassons = ref([
    {
        img: know,
        title: 'Aprendizado Interativo',
        desc: 'Acreditamos que aprender a programar deve ser envolvente e interativo. Nossos cursos incluem desafios práticos, projetos do mundo real e quizzes para garantir que você realmente compreenda os conceitos e possa aplicá-los com confiança.'
    },
    {
        img: clock,
        title: 'Flexibilidade de horário',
        desc: 'A vida é agitada, e entendemos que o aprendizado precisa se adaptar à sua rotina. Nossos cursos são autoinstrucionais, permitindo que você avance no seu próprio ritmo e reveja as aulas sempre que precisar.'
    },
    {
        img: diversity,
        title: 'Diversidade de cursos',
        desc: 'Nossa extensa gama de cursos abrange desde as linguagens de programação mais populares até as tecnologias emergentes do momento. Com a orientação de instrutores apaixonados e especializados, você poderá dominar Python, Java, JavaScript, C++ e muito mais.'
    },
    {
        img: commnity,
        title: 'Comunidade Ativa',
        desc: 'Junte-se a uma comunidade vibrante de alunos, entusiastas e profissionais da área. Compartilhe dúvidas, troque ideias e colabore em projetos conjuntos, criando conexões valiosas que podem impulsionar sua carreira.'
    },
    {
        img: certificate,
        title: 'Diversidade de cursos',
        desc: 'Ao concluir um curso, você receberá um certificado de conclusão que pode enriquecer seu currículo e destacar suas habilidades aos olhos dos empregadores.'
    }
])
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap');

* {
    font-family: 'JetBrains Mono', monospace;
}
</style>
<style scoped>
.HomeContainer {
    @apply w-full min-h-screen flex flex-col
}

.HomeContainer>section {
    @apply w-full min-h-screen py-4 px-6
}

.HomeContainer>section.SectionWelcome {
    background-image: url('../assets/images/homeBackground.png');
    background-size: cover;
}

.HomeContainer>section.SectionRasson {
    @apply bg-white -mt-16 h-[150vh] rounded-t-[50px] flex flex-col
     gap-12 items-center justify-start
}

.HomeContainer>section.SectionRasson>h1 {
    @apply text-4xl
}

.HomeContainer>section.SectionRasson>div {
    @apply w-[70%] flex flex-row gap-24 flex-wrap justify-center
}
</style>
  