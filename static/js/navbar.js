class Navbar extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
        <!-- NAVBAR -->
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper">
                    <a href="#!" class="brand-logo"><img src="../static/imagens/logo.png" alt="Logo do programa MinasCoders com duas meninas, uma de cabelo cacheado e outra de cabelo liso"></a>
                    <a href="#" data-target="mobile-navibar" class="sidenav-trigger">
                        <i class="material-icons">menu</i>
                    </a>
                    <ul class="right hide-on-med-and-down">
                        <li><a href="{{ url_for('projetos') }}">Projetos</a></li>
                        <li><a href="{{ url_for('noticias', pagina=1) }}">Notícias</a></li>
                        <li><a href="{{ url_for('publicacoes', pagina=1) }}">Publicações</a></li>
                        <li><a href="mailto:minascoders@ufv.br" target="_blank"><i class="fa-solid fa-envelope " style="font-size: 16px;"></i></a></li>
                        <li><a href="https://www.instagram.com/minascoders/" target="_blank"><i class="fa-brands fa-instagram" style="font-size: 18px;"></i></a></li>
                        <li><a href="https://www.linkedin.com/company/minascoders/" target="_blank"><i class="fa-brands fa-linkedin-in" style="font-size: 17px;"></i></a></li>
                    </ul>
                </div>
            </nav>
        </div>

        <ul class="sidenav" id="mobile-navibar">
            <!-- Logo no topo -->
            <li class="logo-container"><img src="../static/imagens/logosemfundo.png" alt="Logo do programa MinasCoders com duas meninas, uma de cabelo cacheado e outra de cabelo liso" class="sidenav-logo"></li>
            <div class="itens-sidenav">
                <li><a href="{{ url_for('projetos') }}" class="white-text" style="font-size: 17px;">Projetos</a></li>
                <li><a href="{{ url_for('noticias', pagina=1) }}" class="white-text" style="font-size: 17px;">Notícias</a></li>
                <li><a href="{{ url_for('publicacoes', pagina=1) }}" class="white-text" style="font-size: 17px;">Publicações</a></li>
            </div>
            <div class="icons-sidenav">
                <a href="mailto:minascoders@ufv.br"><i class="fa-solid fa-envelope social-icon " ></i></a>
                <a href="https://www.instagram.com/minascoders/"><i class="fa-brands fa-instagram social-icon"></i></a>
                <a href="https://www.linkedin.com/company/minascoders/"><i class="fa-brands fa-linkedin-in social-icon"></i></a>
            </div>

        </ul>
        `;
    }
}

customElements.define('main-navbar', Navbar);
