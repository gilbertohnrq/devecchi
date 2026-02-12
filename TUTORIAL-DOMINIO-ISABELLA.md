# 🌐 Tutorial: Configurar Domínio isabelladevecchi.com.br

## ✅ Parte 1: Já foi feito (pela Vercel)

- ✅ Domínio `isabelladevecchi.com.br` adicionado
- ✅ Domínio `www.isabelladevecchi.com.br` adicionado
- ✅ Projeto configurado na Vercel

---

## 📋 Parte 2: O que Isabella precisa fazer

### Onde fazer?
O domínio está registrado no **Registro.br** ✅
👉 https://registro.br

**Login:** Use o CPF `***.***.***-**` (o mesmo usado no cadastro)

### Passo a Passo:

#### 1. Fazer Login
- Entre com seu CPF/CNPJ e senha do Registro.br
- Acesse a área de **"Meus Domínios"**
- Clique no domínio **isabelladevecchi.com.br**

#### 2. Configurar DNS
Procure a opção **"Editar Zona DNS"** ou **"DNS"** e adicione os seguintes registros:

---

### 🎯 Registros DNS para adicionar:

#### **Registro A (raiz do domínio):**
```
Tipo: A
Nome: @ (ou deixe vazio, ou isabelladevecchi.com.br)
Valor: 76.76.21.21
TTL: 3600 (ou deixe o padrão)
```

#### **Registro A (www):**
```
Tipo: A
Nome: www
Valor: 76.76.21.21
TTL: 3600 (ou deixe o padrão)
```

---

### 📸 Exemplo Visual:

No Registro.br, vai parecer algo assim:

| Tipo | Nome/Host | Valor/Destino | TTL  |
|------|-----------|---------------|------|
| A    | @         | 76.76.21.21   | 3600 |
| A    | www       | 76.76.21.21   | 3600 |

---

## ⏰ Tempo de Propagação

- Depois de salvar, pode demorar de **15 minutos até 48 horas** para funcionar
- Geralmente funciona em **1 a 2 horas**
- Você receberá um email da Vercel quando estiver tudo pronto

---

## 🔍 Como testar se funcionou?

1. Abra o navegador em modo anônimo
2. Digite: `isabelladevecchi.com.br`
3. Se aparecer o site, está funcionando! 🎉

Ou use este site para verificar: https://dnschecker.org

---

## ❓ Precisa de Ajuda?

Se tiver algum problema, entre em contato com:
- **Suporte Registro.br:** https://registro.br/ajuda
- **Ou me chame que eu ajudo!** 😊

---

## 📌 Informações Importantes:

- **Domínio:** isabelladevecchi.com.br
- **Registrado em:** Registro.br ✅ (confirmado)
- **DNS Atual:** a.auto.dns.br, b.auto.dns.br
- **IP da Vercel:** 76.76.21.21
- **Projeto:** google-flow-website
- **Status atual:** ⚠️ Aguardando configuração DNS

---

**Criado em:** 2026-02-07
