# LB Academy — Guia de Configuração

## O que já está pronto
- `js/firebase-config.js` — conectado ao seu projeto Firebase (lb-acadamy)
- `login.html` — login real com Google, checa se o e-mail tem compra liberada
- `seed.html` — ferramenta pra popular o banco com as 6 trilhas e 28 módulos de uma vez
- `admin.html`, `player.html`, `desafio.html`, `index.html` — telas visuais (ainda estáticas, próxima fase conecto ao banco de verdade)

## Passo 1 — Colocar seu e-mail como admin
Abra `js/firebase-config.js` e troque:
```
export const ADMIN_EMAILS = ["SEU_EMAIL_AQUI@gmail.com"];
```
pelo seu e-mail Google real. É esse e-mail que vai te levar direto pro `admin.html` ao logar.

## Passo 2 — Configurar as regras do Firestore e Storage
No Firebase Console → Firestore Database → Regras, cole (temporário, pra testar):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // TEMPORÁRIO — trocar depois de testar
    }
  }
}
```
Faça o mesmo em Storage → Regras. **Isso é só pra fase de testes** — antes de lançar pra alunos de verdade, eu preciso travar isso (só admin escreve, aluno só lê o que tem acesso).

## Passo 3 — Rodar localmente (não pode abrir direto o arquivo)
Como o login usa módulos JavaScript, o navegador bloqueia se você abrir o `.html` direto (duplo clique). Você precisa rodar um servidor local. Se tiver Python instalado:
```
cd pasta-do-projeto
python3 -m http.server 8000
```
Depois abra `http://localhost:8000/login.html` no navegador.

(Se não tiver Python, me avisa que te indico outra forma — tem várias, tipo a extensão "Live Server" do VS Code.)

## Passo 4 — Autorizar o domínio no Firebase Auth
No Firebase Console → Authentication → Settings → Authorized domains, adicione `localhost` (já deve estar lá por padrão) e, quando formos publicar, `academy.lbmarketplace.com.br`.

## Passo 5 — Rodar o seed (uma vez só)
1. Coloque as 27 imagens dentro da pasta `img/` (já estão lá se você usou o zip completo)
2. Acesse `http://localhost:8000/seed.html`
3. Clique em "Rodar seed agora"
4. Aguarde o log confirmar tudo (trilhas, módulos, imagens)
5. Depois disso, **apague o arquivo seed.html do servidor** — ele não deve ficar publicado

## Passo 6 — Testar o login
Acesse `http://localhost:8000/login.html` e entre com seu e-mail admin. Deve te levar direto pro `admin.html`.

Pra testar como aluno comum, você vai precisar criar manualmente um documento de teste em `compras_liberadas/{seu-email-de-teste}` no Firestore Console, já que o Perfect Pay ainda não está integrado.

---

## O que falta (próximas fases)
1. Conectar `index.html`, `player.html`, `desafio.html` de verdade ao Firestore (hoje são só visuais estáticos)
2. Integrar Perfect Pay (webhook criando documentos em `compras_liberadas`)
3. Travar as regras de segurança do Firestore/Storage
4. Publicar no GitHub Pages com o domínio `academy.lbmarketplace.com.br`
