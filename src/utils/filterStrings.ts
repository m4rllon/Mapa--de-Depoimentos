export const getStringFiltered = (stringDepoimento:string) => {
    const preposicoes = [
        "a", "ante", "até", "após", "com", "contra", "de", "desde", "em", "entre",
        "para", "perante", "por", "sem", "sob", "sobre", "trás", "até", "com", "de", "em", "por", "contra"
      ];
    
      const pronomesPessoais = [
        "eu", "tu", "ele", "ela", "nós", "vós", "eles", "elas", "me", "te", "se", "nos", "vos", "lhe", "lhes"
      ];

      const outros = [
        'e', 'na', 'um', 'uma', 'o', 'no', 'do'
      ]
    
      let palavras = stringDepoimento.toLowerCase().split(" ");
    
      palavras = palavras.filter((palavra) => 
        !preposicoes.includes(palavra) && !pronomesPessoais.includes(palavra) && !outros.includes(palavra)
      );
    
      return palavras.join(" ");
}