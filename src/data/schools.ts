type RawSchool = [boolean, string, number, number, string]

export type School = {
    key: string;
    aloneControler: boolean;
    name: string;
    lat: number;
    lng: number;
    depo: string;
}

const schools: RawSchool[] = [
    [false, 'Jardim de Infância 21 de Abril', -15.81044858071809, -47.906377315574524, "Sou Pedro, estudo no Gama. Um colega era sempre zoado por causa das roupas simples. Chamavam ele de 'pobre'. Ele parou de falar com todo mundo e começou a faltar muito. Acho que a escola deveria ajudar mais nisso."],
    [false, 'Escola Parque 308 Sul', -15.812347993868023, -47.90478944787832, "Oi, sou a Laura, tenho 13 anos e moro em Águas Claras. Na escola, uma menina sempre foi zoada por ser tímida. Diziam que ela era esquisita, e eu via ela chorar todo recreio. Ninguém ajudava, e eu me sentia mal por não saber o que fazer."],
    [false, 'CEF 01 Brasília', -15.812182828215038, -47.897622585573906, "Me chamo Rafael, tenho 11 anos e estudo em Ceilândia. Um colega sempre sofreu bullying por ser mais baixo que os outros. Diziam que ele parecia uma criança e tiravam sarro. Ele se isolou e nunca mais quis participar de nada."],
    [false, 'Centro de Ensino Médio Elefante Branco', -15.807599427561463, -47.90908098219234, "Sou a professora Carolina, leciono Matemática em uma escola da Asa Sul. Um aluno foi zoado por ser novo e não conseguir acompanhar as aulas. O grupo ria quando ele errava. Fiz um trabalho para incentivar mais empatia na turma."],
    [false, 'Escola Classe 314 Sul', -15.826180138960602, -47.92140305056271, "Eu sou o Felipe, tenho 15 anos e estudo no Recanto das Emas. Um colega meu sofreu bullying porque era gago. Sempre que ele tentava falar, interrompiam com piadas. Isso o fez parar de participar das aulas orais e ele se sentia mal."],
    [false, 'Maanaim', -15.883250084147024, -48.01647338336736, "Sou Amanda, 16 anos, Planaltina. Presenciei uma amiga sofrer por usar aparelho. Chamavam ela de 'dentes de metal' e tiravam fotos dela para rir. Ela ficou tão incomodada que começou a faltar às aulas por vergonha."],
    [false, 'Colégio Vitória Régia - Unidade 5', -15.880143973894656, -48.01635536618747, "Eu sou o Thiago, tenho 10 anos e estudo em São Sebastião. Um menino na minha turma sempre foi zoado porque usava óculos. Chamavam ele de 'quatro olhos', e ele acabou ficando muito quieto e triste. Eu acho que isso não é justo."],
    [false, 'EC 01 de Riacho Fundo', -15.884694770260593, -48.01463875242698, "Meu nome é Letícia, tenho 13 anos e moro na Candangolândia. Na minha escola, uma menina era maltratada porque era ruiva. Chamavam ela de 'cenoura' e empurravam no recreio. Isso me deixou muito incomodada, mas ninguém falava nada."],
    [false, 'Berçário e Creche Anjinho da Guarda', -15.885540938753211, -48.01236423918207, "Eu sou Gabriel, tenho 14 anos e estudo no Paranoá. Vi um colega ser humilhado por não ter celular. Os outros tiravam sarro e chamavam ele de 'pobre'. Ele se sentia mal e parava de interagir com a turma. Isso foi bem triste."],
    [false, 'Domínio Centro de Estudantes', -15.881023866287162, -48.01998928406834, "Oi, sou a Bruna, estudo em Sobradinho e tenho 11 anos. Uma amiga sempre foi excluída porque era tímida e usava roupas simples. As meninas riam dela, e ela ficava sempre sozinha. Eu queria que ela fosse mais aceita."],
    [false, 'Colégio Vivenciar', -15.829189298840625, -48.06015519392175, "Sou o Daniel, moro em Taguatinga e estudo aqui. Um amigo sofreu bullying por ser mais calado e usar roupas antigas. Chamavam ele de 'esquisito'. Ele parou de ir às atividades em grupo, e isso me incomodou bastante."],
    [false, 'Centro de Ensino Médio Escola Industrial de Taguatinga', -15.832574362781733, -48.058639524877094, "Sou Marina, tenho 14 anos e moro em Samambaia. Vi uma colega sendo chamada de 'gorda' várias vezes. Faziam piadas maldosas no recreio, e ela parou de comer na escola. Acho que os professores deviam intervir mais."],
    [false, 'Colégio Kandima', -15.831877881792781, -48.05536842581855, "Eu sou Júlio, tenho 15 anos e moro no Guará. Um colega foi excluído porque ele gostava de estudar muito. Chamavam ele de 'nerd' e empurravam no corredor. Ele se isolou e nunca mais quis participar de nada."],
    [false, 'Colégio Sursum Corda', -15.838772761305721, -48.06380129092954, "Sou a professora Patrícia, dou aula de Geografia no Cruzeiro. Um aluno foi humilhado por não ter tênis de marca. Ele chegou a chorar depois de uma aula. Precisamos discutir mais sobre o respeito entre os alunos."],
    [false, 'CEM 02 Ceilândia', -15.806747361448432, -48.109528136977836, "Eu sou Mariana, tenho 12 anos e moro no Riacho Fundo. Vi uma colega ser zoada porque não tinha redes sociais. As meninas riam dela por isso, e ela ficava muito triste. Acho que as pessoas deviam ser mais gentis."],
    [false, 'CEF 16 de Ceilândia', -15.802615312230364, -48.10895073924655, "Eu sou o Lucas, estudo na Asa Norte e tenho 16 anos. Um amigo foi zoado por ser negro. Chamavam ele de 'escurinho' e faziam piadas. Ele se afastou de todo mundo, e eu fiquei sem saber como ajudar."],
    [false, 'Colégio Crescer - Escola de Educação Infantil de ceilândia', -15.824594067033924, -48.116276473095326, "Meu nome é Clara, tenho 13 anos e estudo em Brazlândia. Vi uma colega ser chamada de 'baianinha' por ter vindo da Bahia. Eles faziam piadas sobre o sotaque dela. Ela parou de falar com a turma, e eu fiquei triste por ela."],
    [false, 'Colégio Vitória COC', -16.015103994690726, -48.06120283737706, "Sou a professora Fernanda, do Lago Sul. Um aluno sofreu bullying por ser estrangeiro. Faziam piadas sobre seu sotaque e cultura. Tivemos uma reunião para trabalhar a empatia, e a turma entendeu a importância do respeito."],
    [false, 'Colégio Dom César', -16.015207119054168, -48.06304819713209, "Eu sou a Beatriz, tenho 14 anos e moro no Sudoeste. Vi uma amiga sofrer bullying por causa da acne. Chamavam ela de 'cara de pizza'. Ela começou a se esconder na escola, e ninguém queria se sentar perto dela."],
    [false, 'CED 07 de Gama', -16.01982703587528, -48.065172506617536, "Sou o Felipe, estudo no Guará e tenho 11 anos. Vi um menino ser zoado porque ele gostava de desenhar. Diziam que era 'coisa de menina'. Ele ficou muito triste e parou de mostrar seus desenhos para a turma."],
    [false, 'Colégio PAX - Instituto Social Pax', -16.020404517958244, -48.06126721039177, "Oi, sou Sofia, tenho 13 anos e moro em Taguatinga Norte. Vi uma colega sofrer bullying por ser evangélica. Chamavam ela de 'fanática' e faziam piadas sobre sua religião. Ela parou de falar sobre sua fé"],
]


const formatted: School[] = schools.map(([aloneControler, name, lat, lng, depo]) => ({
    aloneControler,
    name,
    lat,
    lng,
    depo,
    key: JSON.stringify({aloneControler, name, lat, lng, depo }),
  }));
  
  export default formatted;