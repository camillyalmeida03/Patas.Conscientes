-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 25/06/2025 às 03:40
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `patas_conscientes`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `adotante`
--

CREATE TABLE `adotante` (
  `usuario_id` int(11) NOT NULL,
  `sexo` enum('feminino','masculino','naoInformar') DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `cpf` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `bairros`
--

CREATE TABLE `bairros` (
  `id_bairro` int(11) NOT NULL,
  `bairro` varchar(100) DEFAULT NULL,
  `id_cidade_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `bairros`
--

INSERT INTO `bairros` (`id_bairro`, `bairro`, `id_cidade_fk`) VALUES
(1, 'Novo Mundo', 1),
(2, 'Nova Cidade', 1),
(5, 'Paulista', 1),
(13, 'Bairro alto', 2),
(14, 'Laranjeiras', 2),
(15, 'Centro', 6),
(21, 'Icaraí', 9),
(22, 'Bela Vista', 1),
(23, 'Centro', 2),
(24, 'Jardim Novo Mundo', 2),
(25, 'Copacabana', 10),
(26, 'Novo Horizonte', 11);

-- --------------------------------------------------------

--
-- Estrutura para tabela `cidades`
--

CREATE TABLE `cidades` (
  `id_cidade` int(11) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `id_uf_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cidades`
--

INSERT INTO `cidades` (`id_cidade`, `cidade`, `id_uf_fk`) VALUES
(1, 'São Paulo', 25),
(2, 'Matão', 25),
(6, 'Araraquara', 25),
(9, 'Niterói', 19),
(10, 'Rio de Janeiro', 19),
(11, 'Ji-Paraná', 22);

-- --------------------------------------------------------

--
-- Estrutura para tabela `enderecos`
--

CREATE TABLE `enderecos` (
  `id_endereco` int(11) NOT NULL,
  `id_uf_fk` int(11) NOT NULL,
  `id_cidade_fk` int(11) NOT NULL,
  `id_bairro_fk` int(11) NOT NULL,
  `id_rua_fk` int(11) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `cep` varchar(9) NOT NULL,
  `complemento` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `enderecos`
--

INSERT INTO `enderecos` (`id_endereco`, `id_uf_fk`, `id_cidade_fk`, `id_bairro_fk`, `id_rua_fk`, `numero`, `cep`, `complemento`) VALUES
(1, 25, 2, 13, 1, '1647', '15997070', NULL),
(2, 25, 2, 13, 1, '1648', '15997070', NULL),
(8, 19, 9, 21, 4, '456', '24360000', 'Sala 302'),
(23, 22, 11, 26, 11, '610', '76907-228', '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `especies_pets`
--

CREATE TABLE `especies_pets` (
  `id_especie_pet` int(11) NOT NULL,
  `especie` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `especies_pets`
--

INSERT INTO `especies_pets` (`id_especie_pet`, `especie`) VALUES
(1, 'Cachorro'),
(2, 'Gato');

-- --------------------------------------------------------

--
-- Estrutura para tabela `ongs`
--

CREATE TABLE `ongs` (
  `usuario_id` int(11) NOT NULL,
  `nome_ong` varchar(100) DEFAULT NULL,
  `cnpj` varchar(25) DEFAULT NULL,
  `banner` varchar(100) DEFAULT NULL,
  `descricao` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `ongs`
--

INSERT INTO `ongs` (`usuario_id`, `nome_ong`, `cnpj`, `banner`, `descricao`) VALUES
(7, 'qwdacx ', 'fervfdf', NULL, NULL),
(20, 'patas', '14.343.242/3455-25', NULL, NULL),
(22, 'ONG Esperança', '12.345.678/0001-90', NULL, NULL),
(23, 'ONG Patas amigas', '12.345.678/9023-43', NULL, NULL),
(24, 'Ajuda Animal', '12.345.678/0001-90', NULL, NULL),
(31, 'ONG Patas amigas', '11.111.111/1111-11', NULL, NULL),
(32, 'ONG Patinhas', '11.111.111/1111-11', NULL, NULL),
(33, 'ONG 2', '22.222.222/2222-22', NULL, NULL),
(34, 'ONG teste', '11.111.111/1111-11', NULL, NULL),
(37, 'Amor Espeludo', '98.765.432/0001-10', '/uploads/banner_ong/banner_37_1750709622121_ong2.jpg', 'Dedicada ao resgate e reabilitação de animais abandonados.'),
(52, 'ONG Amigos Caninos', '11.111.111/1111-13', '/uploads/banner_ong/banner_52_1750814643795_pexels-ingewallu-177809.jpg', 'Esta ONG é destinada a adoção responsável de cães e gatos.');

-- --------------------------------------------------------

--
-- Estrutura para tabela `pets`
--

CREATE TABLE `pets` (
  `id_pet` int(11) NOT NULL,
  `nome_pet` varchar(250) NOT NULL,
  `id_sexo_fk` int(11) NOT NULL,
  `id_responsavel_fk` int(11) NOT NULL,
  `id_ong_fk` int(11) NOT NULL,
  `id_especie_fk` int(11) NOT NULL,
  `peso` decimal(5,2) UNSIGNED DEFAULT NULL,
  `idade` int(11) DEFAULT NULL,
  `id_raca_fk` int(11) DEFAULT NULL,
  `id_porte_fk` int(11) DEFAULT NULL,
  `vacinado` tinyint(1) DEFAULT 0,
  `sobre_pet` varchar(200) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `data_postagem` timestamp NOT NULL DEFAULT current_timestamp(),
  `status_adocao` enum('disponivel','adotado','pendente') DEFAULT 'disponivel'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `pets`
--

INSERT INTO `pets` (`id_pet`, `nome_pet`, `id_sexo_fk`, `id_responsavel_fk`, `id_ong_fk`, `id_especie_fk`, `peso`, `idade`, `id_raca_fk`, `id_porte_fk`, `vacinado`, `sobre_pet`, `foto`, `data_postagem`, `status_adocao`) VALUES
(8, 'Bolt', 2, 6, 37, 1, 25.00, 4, NULL, 3, 0, 'Muito brincalhão', NULL, '2025-06-24 11:19:12', 'disponivel'),
(15, 'Senhorita', 2, 16, 52, 2, 3.00, 5, 2, 3, 0, 'Carinhosa.', '/uploads/foto_pet/pet_15_1750814686505_pexels-ingewallu-177809.jpg', '2025-06-25 01:24:46', 'disponivel'),
(16, 'Bolt', 1, 16, 52, 1, 15.00, 2, 6, 4, 0, 'Ativo e guloso.', '/uploads/foto_pet/pet_16_1750814767732_pexels-pixabay-220938.jpg', '2025-06-25 01:26:07', 'disponivel'),
(17, 'Tutu', 1, 16, 52, 2, 2.00, 1, 2, 2, 0, 'Filhote felpudo.', '/uploads/foto_pet/pet_17_1750815009192_pexels-lina-1741205.jpg', '2025-06-25 01:30:09', 'disponivel');

-- --------------------------------------------------------

--
-- Estrutura para tabela `portes_pets`
--

CREATE TABLE `portes_pets` (
  `id_porte_pet` int(11) NOT NULL,
  `porte_pet` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `portes_pets`
--

INSERT INTO `portes_pets` (`id_porte_pet`, `porte_pet`) VALUES
(5, 'Gigante'),
(4, 'Grande'),
(3, 'Médio'),
(1, 'Miniatura'),
(2, 'Pequeno');

-- --------------------------------------------------------

--
-- Estrutura para tabela `racas_pets`
--

CREATE TABLE `racas_pets` (
  `id_raca_pet` int(11) NOT NULL,
  `raca` varchar(100) NOT NULL,
  `id_especie_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `racas_pets`
--

INSERT INTO `racas_pets` (`id_raca_pet`, `raca`, `id_especie_fk`) VALUES
(6, 'Border Collie', 1),
(5, 'Dálmata', 1),
(1, 'Sem raça', 1),
(2, 'Sem raça', 2),
(4, 'Siamês', 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `responsaveis`
--

CREATE TABLE `responsaveis` (
  `id_responsavel` int(11) NOT NULL,
  `nome_responsavel` varchar(100) NOT NULL,
  `id_ong_fk` int(11) NOT NULL,
  `cpf_responsavel` varchar(14) NOT NULL,
  `email_responsavel` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `responsaveis`
--

INSERT INTO `responsaveis` (`id_responsavel`, `nome_responsavel`, `id_ong_fk`, `cpf_responsavel`, `email_responsavel`) VALUES
(1, 'Maria Fernanda', 22, '22222222222', 'mariafer@gmail.com'),
(6, 'Rodrigo Lima', 37, '98765432100', 'rodrigo@amorespeludos.org'),
(16, 'Luís Mário', 52, '111.111.111-15', 'emaildoluismario@gmail.com');

-- --------------------------------------------------------

--
-- Estrutura para tabela `ruas`
--

CREATE TABLE `ruas` (
  `id_rua` int(11) NOT NULL,
  `rua` varchar(100) NOT NULL,
  `id_bairro_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `ruas`
--

INSERT INTO `ruas` (`id_rua`, `rua`, `id_bairro_fk`) VALUES
(1, 'Avenida Sete de Setembro', 13),
(2, 'Avenida Siqueira Campos', 13),
(4, 'Rua das Palmeiras', 21),
(5, 'Av. Paulista', 22),
(6, 'Rua das ONGs', 23),
(7, 'Avenida Dario Geraldo', 24),
(8, 'Rua Barata Ribeiro', 25),
(10, 'Avenida Paulista', 22),
(11, 'Rua Acerola', 26);

-- --------------------------------------------------------

--
-- Estrutura para tabela `sexos_pets`
--

CREATE TABLE `sexos_pets` (
  `id_sexo_pet` int(11) NOT NULL,
  `sexo_pet` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `sexos_pets`
--

INSERT INTO `sexos_pets` (`id_sexo_pet`, `sexo_pet`) VALUES
(2, 'Fêmea'),
(1, 'Macho'),
(3, 'Não informado');

-- --------------------------------------------------------

--
-- Estrutura para tabela `uf`
--

CREATE TABLE `uf` (
  `id_uf` int(11) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `sigla` char(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `uf`
--

INSERT INTO `uf` (`id_uf`, `estado`, `sigla`) VALUES
(1, 'Acre', 'AC'),
(2, 'Alagoas', 'AL'),
(3, 'Amapá', 'AP'),
(4, 'Amazonas', 'AM'),
(5, 'Bahia', 'BA'),
(6, 'Ceará', 'CE'),
(7, 'Distrito Federal', 'DF'),
(8, 'Espírito Santo', 'ES'),
(9, 'Goiás', 'GO'),
(10, 'Maranhão', 'MA'),
(11, 'Mato Grosso', 'MT'),
(12, 'Mato Grosso do Sul', 'MS'),
(13, 'Minas Gerais', 'MG'),
(14, 'Pará', 'PA'),
(15, 'Paraíba', 'PB'),
(16, 'Paraná', 'PR'),
(17, 'Pernambuco', 'PE'),
(18, 'Piauí', 'PI'),
(19, 'Rio de Janeiro', 'RJ'),
(20, 'Rio Grande do Norte', 'RN'),
(21, 'Rio Grande do Sul', 'RS'),
(22, 'Rondônia', 'RO'),
(23, 'Roraima', 'RR'),
(24, 'Santa Catarina', 'SC'),
(25, 'São Paulo', 'SP'),
(26, 'Sergipe', 'SE'),
(27, 'Tocantins', 'TO');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(155) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `celular` varchar(20) DEFAULT NULL,
  `senha` varchar(200) NOT NULL,
  `foto` varchar(100) DEFAULT NULL,
  `tipo` enum('adotante','ong','parceiro','responsavel') NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `acessibilidade_ativa` enum('Ligada','Desligada') DEFAULT NULL,
  `tema` enum('Claro','Escuro') DEFAULT NULL,
  `endereco_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `telefone`, `celular`, `senha`, `foto`, `tipo`, `criado_em`, `acessibilidade_ativa`, `tema`, `endereco_id`) VALUES
(7, 'João da ONG', 'joao@exemplo.com', '(11) 2345-6789', '(11) 91234-5678', 'novaSenha123', NULL, 'ong', '2025-05-29 19:44:47', NULL, NULL, NULL),
(20, 'OTÁVIO DOMINGUES DA SILVA', 'otaviodominguessilva@gmail.com', '8495613', '(16) 99632-0063', '$2b$10$wgfqG3NDSudDAJQQeteWyuUo0d9fEPD25OHA2FdYyRQORNCGBD1HW', '/uploads/foto_perfil/1748702524293-mr-robot.jpeg', 'ong', '2025-05-30 18:15:04', NULL, NULL, NULL),
(22, 'Maria Souza', 'maria@ongesperanca.org', '1633334444', '16988887777', '$2b$10$i/VFPGbb4gedA4DSfWn/EeraYPbo1xsfzfOoJmHcJ5mCzxSp7lUsu', 'foto.png', 'ong', '2025-06-16 20:42:52', NULL, NULL, NULL),
(23, 'Marlene', 'marlenepatasamigas@gmail.com', '(12) 33455-6787', '(23) 45334-5654', '$2b$10$/Q24XJ06KWU4lqvmSKFw5ueAMtQOKWBGJBTxp8D8VYsCTNbROaNIG', '', 'ong', '2025-06-16 21:04:49', NULL, NULL, NULL),
(24, 'Ana Souza', 'ana@exemplo.com', '1633330000', '16999999999', '$2b$10$/HmPkQT6rvAoR2TkcXL4lO.jgHpS/lvdVatyOjay3hJClhoFpEMvy', 'foto.jpg', 'ong', '2025-06-17 11:19:00', NULL, NULL, NULL),
(25, 'Ana Maria', 'anamaria@exemplo.com', '1633330000', '16999999999', '$2b$10$VeIHCfPZ5ezU.FcumDXawOcnDKXM5SS.g0wydHeZnnNptILuxEWtu', 'ana.jpg', 'ong', '2025-06-17 11:23:56', NULL, NULL, NULL),
(31, 'Mariana', 'marlenepatasamias@gmail.com', '(12) 33455-6787', '(23) 45334-5654', '$2b$10$gIh9HuXEow8ujwS0pODCGuEh3dn5uOMffGISNwJmmV8/ShUcJ4v9S', '', 'ong', '2025-06-17 12:02:57', NULL, NULL, NULL),
(32, 'Mariana', 'miguinho@gmail.com', '(12) 34567-8910', '(23) 45334-5654', '$2b$10$1XqCC0pqOrBxnjlauZwYCeCqwou0M7jn5z1N6Hbt/s811AR6Mpq6C', '', 'ong', '2025-06-17 14:02:18', NULL, NULL, NULL),
(33, 'Mary', 'emailong1@gmail.com', '(11) 11111-1111', '(11) 11111-1111', '$2b$10$0T0rBDww4shxKzMZtrj63eROKWfdu8Wq5FZOtAY3GnXoj72dDD0q.', '', 'ong', '2025-06-18 16:05:36', NULL, NULL, NULL),
(34, 'Lari', 'ongteste@gmail.com', '(22) 22222-2222', '(22) 22222-2222', '$2b$10$aH0rmFeLMDWriXLoBixnNeqcbVviYq.TciR0zoXDaPAOe1adsS9ly', '', 'ong', '2025-06-19 14:52:03', NULL, NULL, NULL),
(37, '', 'contato@amorespeludos.org', '2123456789', '21987654321', '$2b$10$qWN72Xg2ad/s0mLAuJe39OsFAFYevxL302TnBrRmDqyMaBZspnSVW', '/uploads/foto_perfil/perfil_37_1750709605579_cat2.jpg', 'adotante', '2025-06-20 22:14:35', NULL, NULL, 8),
(52, '', 'ongamigoscaninos@gmail.com', '(11) 11111-1111', '(11) 11111-1111', '$2b$10$7rgPuY5mv3nAOLpdXXXmauvMf7nwjxCNnbQtHuYY17urJLbifahge', '/uploads/foto_perfil/perfil_52_1750814631479_pexels-ingewallu-177809.jpg', 'adotante', '2025-06-25 01:22:16', NULL, NULL, 23);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `adotante`
--
ALTER TABLE `adotante`
  ADD PRIMARY KEY (`usuario_id`);

--
-- Índices de tabela `bairros`
--
ALTER TABLE `bairros`
  ADD PRIMARY KEY (`id_bairro`),
  ADD KEY `cidade_id` (`id_cidade_fk`);

--
-- Índices de tabela `cidades`
--
ALTER TABLE `cidades`
  ADD PRIMARY KEY (`id_cidade`),
  ADD KEY `uf_id` (`id_uf_fk`);

--
-- Índices de tabela `enderecos`
--
ALTER TABLE `enderecos`
  ADD PRIMARY KEY (`id_endereco`),
  ADD KEY `fk_enderecos_bairro` (`id_bairro_fk`),
  ADD KEY `fk_enderecos_cidade` (`id_cidade_fk`),
  ADD KEY `fk_enderecos_rua` (`id_rua_fk`),
  ADD KEY `id_uf_fk` (`id_uf_fk`);

--
-- Índices de tabela `especies_pets`
--
ALTER TABLE `especies_pets`
  ADD PRIMARY KEY (`id_especie_pet`),
  ADD UNIQUE KEY `nome` (`especie`);

--
-- Índices de tabela `ongs`
--
ALTER TABLE `ongs`
  ADD PRIMARY KEY (`usuario_id`);

--
-- Índices de tabela `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`id_pet`),
  ADD KEY `especie_id` (`id_especie_fk`),
  ADD KEY `raca_id` (`id_raca_fk`),
  ADD KEY `porte_id` (`id_porte_fk`),
  ADD KEY `fk_pets_ong_responsavel` (`id_responsavel_fk`),
  ADD KEY `FK_SEXO_PET` (`id_sexo_fk`),
  ADD KEY `FK_ONG_PETS` (`id_ong_fk`);

--
-- Índices de tabela `portes_pets`
--
ALTER TABLE `portes_pets`
  ADD PRIMARY KEY (`id_porte_pet`),
  ADD UNIQUE KEY `nome` (`porte_pet`);

--
-- Índices de tabela `racas_pets`
--
ALTER TABLE `racas_pets`
  ADD PRIMARY KEY (`id_raca_pet`),
  ADD UNIQUE KEY `nome` (`raca`,`id_especie_fk`),
  ADD KEY `especie_id` (`id_especie_fk`);

--
-- Índices de tabela `responsaveis`
--
ALTER TABLE `responsaveis`
  ADD PRIMARY KEY (`id_responsavel`),
  ADD UNIQUE KEY `cpf_responsavel` (`cpf_responsavel`),
  ADD KEY `FK_ID_ONG` (`id_ong_fk`);

--
-- Índices de tabela `ruas`
--
ALTER TABLE `ruas`
  ADD PRIMARY KEY (`id_rua`),
  ADD KEY `bairro_id` (`id_bairro_fk`);

--
-- Índices de tabela `sexos_pets`
--
ALTER TABLE `sexos_pets`
  ADD PRIMARY KEY (`id_sexo_pet`),
  ADD UNIQUE KEY `nome` (`sexo_pet`);

--
-- Índices de tabela `uf`
--
ALTER TABLE `uf`
  ADD PRIMARY KEY (`id_uf`),
  ADD UNIQUE KEY `sigla` (`sigla`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_endereco_usuario` (`endereco_id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `bairros`
--
ALTER TABLE `bairros`
  MODIFY `id_bairro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de tabela `cidades`
--
ALTER TABLE `cidades`
  MODIFY `id_cidade` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de tabela `enderecos`
--
ALTER TABLE `enderecos`
  MODIFY `id_endereco` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de tabela `especies_pets`
--
ALTER TABLE `especies_pets`
  MODIFY `id_especie_pet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `pets`
--
ALTER TABLE `pets`
  MODIFY `id_pet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de tabela `portes_pets`
--
ALTER TABLE `portes_pets`
  MODIFY `id_porte_pet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `racas_pets`
--
ALTER TABLE `racas_pets`
  MODIFY `id_raca_pet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `responsaveis`
--
ALTER TABLE `responsaveis`
  MODIFY `id_responsavel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de tabela `ruas`
--
ALTER TABLE `ruas`
  MODIFY `id_rua` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de tabela `sexos_pets`
--
ALTER TABLE `sexos_pets`
  MODIFY `id_sexo_pet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `uf`
--
ALTER TABLE `uf`
  MODIFY `id_uf` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `adotante`
--
ALTER TABLE `adotante`
  ADD CONSTRAINT `adotante_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Restrições para tabelas `bairros`
--
ALTER TABLE `bairros`
  ADD CONSTRAINT `bairros_ibfk_1` FOREIGN KEY (`id_cidade_fk`) REFERENCES `cidades` (`id_cidade`);

--
-- Restrições para tabelas `cidades`
--
ALTER TABLE `cidades`
  ADD CONSTRAINT `cidades_ibfk_1` FOREIGN KEY (`id_uf_fk`) REFERENCES `uf` (`id_uf`);

--
-- Restrições para tabelas `enderecos`
--
ALTER TABLE `enderecos`
  ADD CONSTRAINT `enderecos_ibfk_1` FOREIGN KEY (`id_cidade_fk`) REFERENCES `cidades` (`id_cidade`),
  ADD CONSTRAINT `enderecos_ibfk_2` FOREIGN KEY (`id_bairro_fk`) REFERENCES `bairros` (`id_bairro`),
  ADD CONSTRAINT `enderecos_ibfk_3` FOREIGN KEY (`id_rua_fk`) REFERENCES `ruas` (`id_rua`),
  ADD CONSTRAINT `id_uf_fk` FOREIGN KEY (`id_uf_fk`) REFERENCES `uf` (`id_uf`);

--
-- Restrições para tabelas `ongs`
--
ALTER TABLE `ongs`
  ADD CONSTRAINT `ongs_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Restrições para tabelas `pets`
--
ALTER TABLE `pets`
  ADD CONSTRAINT `FK_ONG_PETS` FOREIGN KEY (`id_ong_fk`) REFERENCES `ongs` (`usuario_id`),
  ADD CONSTRAINT `FK_SEXO_PET` FOREIGN KEY (`id_sexo_fk`) REFERENCES `sexos_pets` (`id_sexo_pet`),
  ADD CONSTRAINT `fk_pets_responsavel` FOREIGN KEY (`id_responsavel_fk`) REFERENCES `responsaveis` (`id_responsavel`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pets_ibfk_1` FOREIGN KEY (`id_especie_fk`) REFERENCES `especies_pets` (`id_especie_pet`) ON UPDATE CASCADE,
  ADD CONSTRAINT `pets_ibfk_2` FOREIGN KEY (`id_raca_fk`) REFERENCES `racas_pets` (`id_raca_pet`) ON UPDATE CASCADE,
  ADD CONSTRAINT `pets_ibfk_3` FOREIGN KEY (`id_porte_fk`) REFERENCES `portes_pets` (`id_porte_pet`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `racas_pets`
--
ALTER TABLE `racas_pets`
  ADD CONSTRAINT `racas_pets_ibfk_1` FOREIGN KEY (`id_especie_fk`) REFERENCES `especies_pets` (`id_especie_pet`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restrições para tabelas `responsaveis`
--
ALTER TABLE `responsaveis`
  ADD CONSTRAINT `FK_ID_ONG` FOREIGN KEY (`id_ong_fk`) REFERENCES `ongs` (`usuario_id`);

--
-- Restrições para tabelas `ruas`
--
ALTER TABLE `ruas`
  ADD CONSTRAINT `ruas_ibfk_1` FOREIGN KEY (`id_bairro_fk`) REFERENCES `bairros` (`id_bairro`);

--
-- Restrições para tabelas `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_endereco_usuario` FOREIGN KEY (`endereco_id`) REFERENCES `enderecos` (`id_endereco`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
