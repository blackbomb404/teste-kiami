import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Carousel } from './core/models/carousel.type';
import { Services } from './core/models/services.type';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
    `
  ],
})
export class AppComponent implements AfterViewInit {
  @ViewChildren('section') sectionsRef!: QueryList<ElementRef>;
  @ViewChildren('indicator') indicatorsRef!: QueryList<ElementRef>;
  @ViewChild('carouselWindow') carouselWindowRef!: ElementRef;

  private sectionsArray!: ElementRef[];
  private indicatorsArray!: ElementRef[];

  logoPath = 'assets/images/kiamisoft-logo.png';
  navLinks = [
    { text: 'Kiamisoft', path: '' },
    { text: 'Serviços', path: '' },
    { text: 'Portfólio', path: '' },
    { text: 'Notícias', path: '' },
    { text: 'Testemunhos', path: '' }
  ];
  carousel: Carousel  = [
    // { thumbnailPath: 'assets/images/__banner_hero.jpg', title: 'A SUA EMPRES É A SOMA DAS PARCERIAS FEITOS AO LONGO DA SUA TRAGETORIA. KIAMISOFT, A PARCERIA CERTA PARA O SEU NEGÓCIO.' },
    // { thumbnailPath: 'assets/images/__banner_hero.jpg', title: 'A SUA EMPRES É A SOMA DAS PARCERIAS FEITOS AO LONGO DA SUA TRAGETORIA. KIAMISOFT, A PARCERIA CERTA PARA O SEU NEGÓCIO.' },
    // { thumbnailPath: 'assets/images/__banner_hero.jpg', title: 'A SUA EMPRES É A SOMA DAS PARCERIAS FEITOS AO LONGO DA SUA TRAGETORIA. KIAMISOFT, A PARCERIA CERTA PARA O SEU NEGÓCIO.' },
    // { thumbnailPath: 'assets/images/__banner_hero.jpg', title: 'A SUA EMPRES É A SOMA DAS PARCERIAS FEITOS AO LONGO DA SUA TRAGETORIA. KIAMISOFT, A PARCERIA CERTA PARA O SEU NEGÓCIO.' }
  ];
  activeItem = 0;
  services: Services = [
    // { imagePath: 'assets/images/__servico1.jpg', title: 'Call Center', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, seddiam nonummy nibh ' },
    // { imagePath: 'assets/images/__servico2.jpg', title: 'Suporte remoto', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, seddiam nonummy nibh ' },
    // { imagePath: 'assets/images/__servico3.jpg', title: 'Criação de Software de Gestão', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, seddiam nonummy nibh ' },
    // { imagePath: 'assets/images/__servico4.jpg', title: 'Web design, Branding e Marketing Digital', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, seddiam nonummy nibh ' }
  ];
  portfolio = [
    { thumbnail: 'assets/images/__portfolio_1.jpg' },
    { thumbnail: 'assets/images/__portfolio_2.jpg' },
    { thumbnail: 'assets/images/__portfolio_3.jpg' },
    { thumbnail: 'assets/images/__portfolio_4.jpg' },
    { thumbnail: 'assets/images/__portfolio_5.jpg' },
    { thumbnail: 'assets/images/__portfolio_6.jpg' }
  ];
  news = [
    { thumbnail: 'assets/images/__noticias1.jpg', postedAt: '2022-01-12', sector: 'Economia', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit' },
    { thumbnail: 'assets/images/__noticias2.jpg', postedAt: '2022-01-12', sector: 'Inteligência Artificial', description: 'dfdfdf fggffgf ggfgfgf dfgd gffggff fgfg dfjm dflkj lj lkfdjkldj lfkjdkljlfd dfd dfm lkdj ldfj lfjl kdj lkjdflk jdflkjfdlk jldkf jlkdfj lkdfj ldfj lkdfjlkjdf Lorem ipsum dolor sit amet, consectetuer adipiscing elit' },
    { thumbnail: 'assets/images/__noticias3.jpg', postedAt: '2022-01-12', sector: 'Economia', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit' },
    { thumbnail: 'assets/images/__noticias4.jpg', postedAt: '2022-01-12', sector: 'Economia', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit' }
  ];
  socialNetwoks = [
    { iconPath: 'assets/icons/linkedin.svg', url: 'https://linkedin.com/company/kiamisoft' },
    { iconPath: 'assets/icons/facebook.svg', url: 'https://facebook.com/KiamiSoft' },
    { iconPath: 'assets/icons/youtube.svg', url: 'https://youtube.com' },
    { iconPath: 'assets/icons/instagram.svg', url: 'https://instagram.com/kiamisoft' }
  ]
  contactForm = this.fb.group({
    name: ['', Validators.required],
    phoneNumber: [''],
    email: ['', Validators.required, Validators.email],
    subject: ['', Validators.required],
    message: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private meta: Meta
  ){ 

    this.http.get(
      'https://dev-back.kiami.ao/cms/api/v1/paginas/pagina/1'
    ).subscribe(({objecto: data}: any) => {
      const slide = data.seccoes
                      .find((sect: any) => sect.idSeccao === 8).slides
                      .find((slide: any) => slide.idSlide = 2);
      this.carousel = slide.banners.map(
        (banner: any) => ({
          thumbnailPath: banner.imagem,
          title: banner.textos[0].titulo,
          actionButtonText: banner.textos[0].accaoTexto,
          actionButtonUrl: banner.textos[0].accaoUrl,
          active: banner.activo
        })
      );

      this.services = data.seccoes
                        .find((sect: any) => sect.idSeccao === 10).registos
                        .map((registo: any) => ({
                          iconPath: registo?.icone?.icone,
                          title: registo.nome,
                          description: registo.introducao
                        }));
      this.meta.addTags([
        { property: 'og:title', content: 'Sample content for testing' },
        { property: 'og:description', content: 'You know what? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus, vitae nemo quisquam aliquid culpa ut nulla. Quaerat deleniti, impedit natus quod, possimus nulla ullam fugiat doloremque eos obcaecati, ratione a.' },
        { property: 'og:url', content: 'https://teste-kiami.vercel.app/' },
        { property: 'og:image', content: 'https://dev-back.kiami.ao/cms/FilesCMS/Repositorio/Imagens/6_imagem.jpeg' }
      ])
      
    })
  }
  
  ngAfterViewInit(): void {
    this.sectionsArray = this.sectionsRef.toArray();
    this.indicatorsArray = this.indicatorsRef.toArray();
  }

  scrollIntoSection(index: number){
    (this.sectionsArray[index].nativeElement as HTMLElement).scrollIntoView({ behavior: 'smooth' });
  }
  scrollToFrame(index: number) {
    var el = (this.carouselWindowRef.nativeElement as HTMLElement);
    el.scrollTo({ behavior: 'smooth', left: index * el.clientWidth });

    this.activeItem = index;
  }
}
