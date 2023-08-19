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
            <section class="TrailSection">
                <h1>Explore nossos Destaques</h1>
                <div class="HighlightsContainer">
                    <div class="fullStack">
                        <Highlight :img="rocket">
                            <template #title>Trilha de Desenvolvimento Web Full Stack:</template>
                            <template #desc>
                                Domine o front-end e o back-end, criando aplicativos web completos e dinâmicos.
                            </template>
                        </Highlight>
                    </div>
                    <div class="mobile">
                        <Highlight :img="smartphone">
                            <template #title>Desenvolvimento de Aplicativos Móveis:</template>
                            <template #desc>
                                Entre no mundo dos apps, construindo interfaces intuitivas e funcionais para dispositivos
                                móveis
                            </template>
                        </Highlight>
                    </div>
                    <div class="ai">
                        <Highlight :img="ai">
                            <template #title>Inteligência Artificial e Machine Learning::</template>
                            <template #desc>
                                Descubra como ensinar máquinas a aprender e tomar decisões inteligentes.
                            </template>
                        </Highlight>
                    </div>
                    <div class="iot">
                        <Highlight :img="iot">
                            <template #title> Internet das Coisas (IoT):</template>
                            <template #desc>
                                Conecte o mundo físico ao digital, criando dispositivos inteligentes e interativos.
                            </template>
                        </Highlight>
                    </div>
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
import rocket from '../assets/images/rocket.png'
import iot from '../assets/images/iot.png'
import ai from '../assets/images/ai.png'
import smartphone from '../assets/images/smartphone.png'
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
    @apply w-full min-h-screen py-6 px-3
}

.HomeContainer>section.SectionWelcome {
    background-image: url('../assets/images/homeBackground.png');
    background-size: cover;
    background-position: center;
}

.HomeContainer>section.SectionRasson {
    @apply bg-white -mt-16 h-max min-h-[20vh]
     rounded-t-[50px] flex flex-col gap-12 items-center justify-start
}

.HomeContainer>section.SectionRasson>h1 {
    @apply text-2xl sm:text-4xl text-center
}

.HomeContainer>section.SectionRasson>div {
    @apply w-[70%] flex flex-row gap-24 flex-wrap justify-center
}

.HomeContainer>section.TrailSection {
    @apply bg-white min-h-[150vh] flex flex-col gap-12 items-center justify-start px-8
}

.HomeContainer>section.TrailSection>h1 {
    @apply w-full border-t border-black/50
    text-2xl sm:text-4xl text-center pt-6
}

.HomeContainer>section.TrailSection>div.HighlightsContainer {
    @apply w-full h-max flex flex-col gap-4 
}


.HomeContainer>section.TrailSection>div.HighlightsContainer>div {
    background-size: cover;
    @apply w-full h-[70vh] hover:h-[85vh] transition-all cursor-pointer flex items-center justify-center rounded-3xl
}

.HomeContainer>section.TrailSection>div.HighlightsContainer>div.fullStack {
    background-image: url('../assets/images/programmingDomination.webp');
}

.HomeContainer>section.TrailSection>div.HighlightsContainer>div.mobile {
    background-image: url('../assets/images/mobileDomination.webp');
}

.HomeContainer>section.TrailSection>div.HighlightsContainer>div.ai {
    background-image: url('../assets/images/aiDomination.webp');
}

.HomeContainer>section.TrailSection>div.HighlightsContainer>div.iot {
    background-image: url('../assets/images/iotDomination.webp');
}
</style>
  