-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 05/06/2025 às 02:41
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
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cidade_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `cidades`
--

CREATE TABLE `cidades` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `uf_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `enderecos`
--

CREATE TABLE `enderecos` (
  `id` int(11) NOT NULL,
  `id_cidade` int(11) NOT NULL,
  `id_bairro` int(11) NOT NULL,
  `id_rua` int(11) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `cep` varchar(9) NOT NULL,
  `complemento` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `especies_pets`
--

CREATE TABLE `especies_pets` (
  `id` int(11) NOT NULL,
  `nome` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `ongs`
--

CREATE TABLE `ongs` (
  `usuario_id` int(11) NOT NULL,
  `nome_ong` varchar(100) DEFAULT NULL,
  `cnpj` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `ongs`
--

INSERT INTO `ongs` (`usuario_id`, `nome_ong`, `cnpj`) VALUES
(7, 'qwdacx ', 'fervfdf'),
(20, 'patas', '14.343.242/3455-25');

-- --------------------------------------------------------

--
-- Estrutura para tabela `pets`
--

CREATE TABLE `pets` (
  `id` int(11) NOT NULL,
  `nome_pet` varchar(250) NOT NULL,
  `sexo` enum('Macho','Fêmea','Não informado') DEFAULT 'Não informado',
  `ong_responsavel` int(11) NOT NULL,
  `especie_id` int(11) NOT NULL,
  `peso` decimal(5,2) UNSIGNED DEFAULT NULL,
  `idade` int(11) DEFAULT NULL,
  `raca_id` int(11) DEFAULT NULL,
  `porte_id` int(11) DEFAULT NULL,
  `vacinado` tinyint(1) NOT NULL DEFAULT 0,
  `sobre_pet` varchar(1000) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `data_postagem` timestamp NOT NULL DEFAULT current_timestamp(),
  `status_adocao` enum('disponivel','adotado','pendente') DEFAULT 'disponivel'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `portes_pets`
--

CREATE TABLE `portes_pets` (
  `id` int(11) NOT NULL,
  `nome` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `portes_pets`
--

INSERT INTO `portes_pets` (`id`, `nome`) VALUES
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
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `especie_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `ruas`
--

CREATE TABLE `ruas` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `bairro_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `sexos_pets`
--

CREATE TABLE `sexos_pets` (
  `id` int(11) NOT NULL,
  `nome` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `sexos_pets`
--

INSERT INTO `sexos_pets` (`id`, `nome`) VALUES
(2, 'Fêmea'),
(1, 'Macho'),
(3, 'Não informado');

-- --------------------------------------------------------

--
-- Estrutura para tabela `uf`
--

CREATE TABLE `uf` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `sigla` char(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `uf`
--

INSERT INTO `uf` (`id`, `nome`, `sigla`) VALUES
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
  `senha` varchar(100) NOT NULL,
  `foto` varchar(100) DEFAULT NULL,
  `tipo` enum('adotante','ong','parceiro') NOT NULL,
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
(20, 'OTÁVIO DOMINGUES DA SILVA', 'otaviodominguessilva@gmail.com', '8495613', '(16) 99632-0063', '$2b$10$wgfqG3NDSudDAJQQeteWyuUo0d9fEPD25OHA2FdYyRQORNCGBD1HW', '/uploads/foto_perfil/1748702524293-mr-robot.jpeg', 'ong', '2025-05-30 18:15:04', NULL, NULL, NULL);

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `cidade_id` (`cidade_id`);

--
-- Índices de tabela `cidades`
--
ALTER TABLE `cidades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uf_id` (`uf_id`);

--
-- Índices de tabela `enderecos`
--
ALTER TABLE `enderecos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_enderecos_bairro` (`id_bairro`),
  ADD KEY `fk_enderecos_cidade` (`id_cidade`),
  ADD KEY `fk_enderecos_rua` (`id_rua`);

--
-- Índices de tabela `especies_pets`
--
ALTER TABLE `especies_pets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nome` (`nome`);

--
-- Índices de tabela `ongs`
--
ALTER TABLE `ongs`
  ADD PRIMARY KEY (`usuario_id`);

--
-- Índices de tabela `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `especie_id` (`especie_id`),
  ADD KEY `raca_id` (`raca_id`),
  ADD KEY `porte_id` (`porte_id`),
  ADD KEY `fk_pets_ong_responsavel` (`ong_responsavel`);

--
-- Índices de tabela `portes_pets`
--
ALTER TABLE `portes_pets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nome` (`nome`);

--
-- Índices de tabela `racas_pets`
--
ALTER TABLE `racas_pets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nome` (`nome`,`especie_id`),
  ADD KEY `especie_id` (`especie_id`);

--
-- Índices de tabela `ruas`
--
ALTER TABLE `ruas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bairro_id` (`bairro_id`);

--
-- Índices de tabela `sexos_pets`
--
ALTER TABLE `sexos_pets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nome` (`nome`);

--
-- Índices de tabela `uf`
--
ALTER TABLE `uf`
  ADD PRIMARY KEY (`id`),
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `cidades`
--
ALTER TABLE `cidades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `enderecos`
--
ALTER TABLE `enderecos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `especies_pets`
--
ALTER TABLE `especies_pets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pets`
--
ALTER TABLE `pets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `portes_pets`
--
ALTER TABLE `portes_pets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `racas_pets`
--
ALTER TABLE `racas_pets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `ruas`
--
ALTER TABLE `ruas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `sexos_pets`
--
ALTER TABLE `sexos_pets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `uf`
--
ALTER TABLE `uf`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

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
  ADD CONSTRAINT `bairros_ibfk_1` FOREIGN KEY (`cidade_id`) REFERENCES `cidades` (`id`);

--
-- Restrições para tabelas `cidades`
--
ALTER TABLE `cidades`
  ADD CONSTRAINT `cidades_ibfk_1` FOREIGN KEY (`uf_id`) REFERENCES `uf` (`id`);

--
-- Restrições para tabelas `enderecos`
--
ALTER TABLE `enderecos`
  ADD CONSTRAINT `enderecos_ibfk_1` FOREIGN KEY (`id_cidade`) REFERENCES `cidades` (`id`),
  ADD CONSTRAINT `enderecos_ibfk_2` FOREIGN KEY (`id_bairro`) REFERENCES `bairros` (`id`),
  ADD CONSTRAINT `enderecos_ibfk_3` FOREIGN KEY (`id_rua`) REFERENCES `ruas` (`id`);

--
-- Restrições para tabelas `ongs`
--
ALTER TABLE `ongs`
  ADD CONSTRAINT `ongs_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Restrições para tabelas `pets`
--
ALTER TABLE `pets`
  ADD CONSTRAINT `fk_pets_ong_responsavel` FOREIGN KEY (`ong_responsavel`) REFERENCES `ongs` (`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pets_ibfk_1` FOREIGN KEY (`especie_id`) REFERENCES `especies_pets` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `pets_ibfk_2` FOREIGN KEY (`raca_id`) REFERENCES `racas_pets` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `pets_ibfk_3` FOREIGN KEY (`porte_id`) REFERENCES `portes_pets` (`id`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `racas_pets`
--
ALTER TABLE `racas_pets`
  ADD CONSTRAINT `racas_pets_ibfk_1` FOREIGN KEY (`especie_id`) REFERENCES `especies_pets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restrições para tabelas `ruas`
--
ALTER TABLE `ruas`
  ADD CONSTRAINT `ruas_ibfk_1` FOREIGN KEY (`bairro_id`) REFERENCES `bairros` (`id`);

--
-- Restrições para tabelas `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_endereco_usuario` FOREIGN KEY (`endereco_id`) REFERENCES `enderecos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
