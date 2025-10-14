class Footer extends HTMLElement{
    connectedCallback(){
        this.innerHTML = ` 
        <!-- FOOTER -->
        <footer class="page-footer">
            <div class="container">
                <div class="row">
                    <div class="col l6 s12">
                        <h5><b>MinasCoders - HighSchoolMinas</b></h5>
                        <p>
                            Universidade Federal de Viçosa - Campus Florestal
                            <br>
                            Florestal – MG. Rodovia LMG 818, km 06, s/n, Florestal - MG, 35690-000
                        </p>
                    </div>
                    <div class="col l4 offset-l2 s12 right">
                        <ul class="right">
                            <li><a class="grey-text text-lighten-3" href="https://www.instagram.com/minascoders/" target="_blank"><i class="fa-brands fa-instagram"></i></a></li>
                            <li><a class="grey-text text-lighten-3" href="https://www.linkedin.com/company/minascoders/" target="_blank"><i class="fa-brands fa-linkedin-in"></i></a></li>
                            <li><a class="grey-text text-lighten-3" href="mailto:minascoders.hsm@ufv.br" target="_blank"><i class="fa-solid fa-envelope"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer-copyright">
                <div class="container">
                    © 2025 MinasCoders - HighSchoolMinas
                </div>
            </div>
        </footer>`;
    
    }

}

customElements.define('main-footer', Footer);