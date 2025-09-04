-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 04/09/2025 às 15:23
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
-- Banco de dados: `patasconscientes`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `bairros`
--

CREATE TABLE `bairros` (
  `idbairro` int(11) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `fk_idcidade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `bairros`
--

INSERT INTO `bairros` (`idbairro`, `bairro`, `fk_idcidade`) VALUES
(1, 'Novo Mundo', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `cidades`
--

CREATE TABLE `cidades` (
  `idcidade` int(11) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `fk_idestado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `cidades`
--

INSERT INTO `cidades` (`idcidade`, `cidade`, `fk_idestado`) VALUES
(1, 'Matão', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `enderecos`
--

CREATE TABLE `enderecos` (
  `idendereco` int(11) NOT NULL,
  `fk_idcidade` int(11) NOT NULL,
  `fk_idbairro` int(11) NOT NULL,
  `fk_idrua` int(11) NOT NULL,
  `fk_idestado` int(11) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `cep` varchar(9) NOT NULL,
  `complemento` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `enderecos`
--

INSERT INTO `enderecos` (`idendereco`, `fk_idcidade`, `fk_idbairro`, `fk_idrua`, `fk_idestado`, `numero`, `cep`, `complemento`) VALUES
(1, 1, 1, 1, 1, '192', '15997-422', 'Casa');

-- --------------------------------------------------------

--
-- Estrutura para tabela `especiespet`
--

CREATE TABLE `especiespet` (
  `idespeciepet` int(11) NOT NULL,
  `especie` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `estados`
--

CREATE TABLE `estados` (
  `idestado` int(11) NOT NULL,
  `sigla` varchar(2) NOT NULL,
  `estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `estados`
--

INSERT INTO `estados` (`idestado`, `sigla`, `estado`) VALUES
(1, 'SP', 'São Paulo');

-- --------------------------------------------------------

--
-- Estrutura para tabela `funcionarios`
--

CREATE TABLE `funcionarios` (
  `idfuncionario` int(11) NOT NULL,
  `fk_idusuario` int(11) NOT NULL,
  `fk_idong` int(11) NOT NULL,
  `fk_idresponsavel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `funcionarios`
--

INSERT INTO `funcionarios` (`idfuncionario`, `fk_idusuario`, `fk_idong`, `fk_idresponsavel`) VALUES
(1, 1, 1, 1),
(2, 1, 3, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `ongs`
--

CREATE TABLE `ongs` (
  `idong` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cnpj` varchar(18) NOT NULL,
  `telefone` varchar(14) NOT NULL,
  `descricao` varchar(250) NOT NULL,
  `foto` text DEFAULT NULL,
  `banner` text DEFAULT NULL,
  `fk_idendereco` int(11) NOT NULL,
  `comp_estatuto` text NOT NULL,
  `comp_cnpj` text NOT NULL,
  `email` varchar(250) NOT NULL,
  `senha` varchar(250) NOT NULL,
  `data_criacao` datetime NOT NULL DEFAULT current_timestamp(),
  `data_att` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fk_idtipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `ongs`
--

INSERT INTO `ongs` (`idong`, `nome`, `cnpj`, `telefone`, `descricao`, `foto`, `banner`, `fk_idendereco`, `comp_estatuto`, `comp_cnpj`, `email`, `senha`, `data_criacao`, `data_att`, `fk_idtipo`) VALUES
(1, 'Ong teste 1', '1111111', '1111111', 'Descrição.', 'teste foto.', 'teste banner.', 1, 'Comprovante teste.', 'Comprovante teste.', 'ongteste1@gmail.com', '12345', '2025-09-02 08:47:47', '2025-09-02 08:59:18', 4),
(3, 'Ong teste 2', '222222222', '22222222', 'Descrição teste ong teste 2.', NULL, NULL, 1, 'Comprovante teste.', 'Comprovante teste.', 'ongteste2@gmail.com', '12345', '2025-09-04 08:18:12', '2025-09-04 08:18:12', 4);

-- --------------------------------------------------------

--
-- Estrutura para tabela `ongsfavoritadas`
--

CREATE TABLE `ongsfavoritadas` (
  `idongfavoritada` int(11) NOT NULL,
  `fk_idusuario` int(11) NOT NULL,
  `fk_idong` int(11) NOT NULL,
  `data_favoritada` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pets`
--

CREATE TABLE `pets` (
  `idpet` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `fk_idsexopet` int(11) NOT NULL,
  `fk_idespecie` int(11) NOT NULL,
  `fk_idraca` int(11) NOT NULL,
  `fk_idporte` int(11) NOT NULL,
  `fk_idresponsavel` int(11) NOT NULL,
  `fk_idong` int(11) NOT NULL,
  `peso` decimal(5,2) UNSIGNED NOT NULL,
  `idade` int(11) NOT NULL,
  `vacinado` tinyint(1) NOT NULL,
  `descricao` varchar(200) DEFAULT NULL,
  `fotos` text NOT NULL,
  `data_post` datetime NOT NULL DEFAULT current_timestamp(),
  `data_att` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fk_idstatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `petsfavoritados`
--

CREATE TABLE `petsfavoritados` (
  `idpetfavoritado` int(11) NOT NULL,
  `fk_idusuario` int(11) NOT NULL,
  `fk_idpet` int(11) NOT NULL,
  `data_favoritado` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `portespet`
--

CREATE TABLE `portespet` (
  `idportepet` int(11) NOT NULL,
  `porte` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `racaspet`
--

CREATE TABLE `racaspet` (
  `idracapet` int(11) NOT NULL,
  `raca` varchar(100) NOT NULL,
  `fk_idespeciepet` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `redessociais`
--

CREATE TABLE `redessociais` (
  `idredesocial` int(11) NOT NULL,
  `fk_idong` int(11) NOT NULL,
  `plataforma` varchar(50) NOT NULL,
  `link` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `redessociais`
--

INSERT INTO `redessociais` (`idredesocial`, `fk_idong`, `plataforma`, `link`) VALUES
(1, 1, 'Facebook', 'linkficticio');

-- --------------------------------------------------------

--
-- Estrutura para tabela `responsaveis`
--

CREATE TABLE `responsaveis` (
  `idresponsavel` int(11) NOT NULL,
  `fk_idusuario` int(11) NOT NULL,
  `fk_idong` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `responsaveis`
--

INSERT INTO `responsaveis` (`idresponsavel`, `fk_idusuario`, `fk_idong`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `ruas`
--

CREATE TABLE `ruas` (
  `idrua` int(11) NOT NULL,
  `rua` varchar(150) NOT NULL,
  `fk_idbairro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `ruas`
--

INSERT INTO `ruas` (`idrua`, `rua`, `fk_idbairro`) VALUES
(1, 'Dário Geraldo', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `sexo`
--

CREATE TABLE `sexo` (
  `idsexo` int(11) NOT NULL,
  `sexo` varchar(17) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `sexo`
--

INSERT INTO `sexo` (`idsexo`, `sexo`) VALUES
(1, 'Feminino'),
(2, 'Masculino'),
(3, 'Prefiro não dizer');

-- --------------------------------------------------------

--
-- Estrutura para tabela `sexospet`
--

CREATE TABLE `sexospet` (
  `idsexopet` int(11) NOT NULL,
  `sexopet` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `sexospet`
--

INSERT INTO `sexospet` (`idsexopet`, `sexopet`) VALUES
(1, 'Indefinido'),
(2, 'Fêmea'),
(4, 'Macho');

-- --------------------------------------------------------

--
-- Estrutura para tabela `status`
--

CREATE TABLE `status` (
  `idstatus` int(11) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `status`
--

INSERT INTO `status` (`idstatus`, `status`) VALUES
(1, 'Disponível'),
(3, 'Reservado');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tipos_usuario`
--

CREATE TABLE `tipos_usuario` (
  `idtipo` int(11) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `descricao` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `tipos_usuario`
--

INSERT INTO `tipos_usuario` (`idtipo`, `tipo`, `descricao`) VALUES
(1, 'Desenvolvedor', 'Possui acesso ao código-fonte, manutenção do sistema, criação e edição de funcionalidades, gerenciamento de banco de dados e APIs, com restrição a dados sensíveis e aprovações administrativas.'),
(3, 'Padrão', 'Um usuário padrão pode criar e gerenciar seu perfil, visualizar animais disponíveis para adoção, conhecer as ONGs cadastradas e demonstrar interesse em adotar, mas não tem permissão para cadastrar ou editar informações de animais ou organizações.'),
(4, 'ONG', 'ONG pode cadastrar e gerenciar os animais disponíveis para adoção, atualizar suas informações de perfil (como endereço, contato e missão da organização), responder às manifestações de interesse dos usuários e divulgar conteúdos sobre seus projetos. Diferente do usuário comum, a ONG tem papel ativo n');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `idusuario` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(250) NOT NULL,
  `telefone` varchar(15) DEFAULT NULL,
  `fk_idsexo` int(11) NOT NULL,
  `data_nasc` date NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `senha` varchar(250) NOT NULL,
  `data_criacao` datetime NOT NULL DEFAULT current_timestamp(),
  `data_att` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `foto` text DEFAULT NULL,
  `fk_idendereco` int(11) NOT NULL,
  `fk_idtipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`idusuario`, `nome`, `email`, `telefone`, `fk_idsexo`, `data_nasc`, `cpf`, `senha`, `data_criacao`, `data_att`, `foto`, `fk_idendereco`, `fk_idtipo`) VALUES
(1, 'Maria Fernanda Silva', 'mfsfernandasilva794@gmail.com', '(16)99393-6344', 1, '2006-05-29', '111.111.111-11', 'testinhosenhona', '2025-08-27 09:00:59', '2025-08-27 09:03:53', 'sem foto', 1, 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `bairros`
--
ALTER TABLE `bairros`
  ADD PRIMARY KEY (`idbairro`),
  ADD KEY `FK_CIDADE_BAIRRO` (`fk_idcidade`);

--
-- Índices de tabela `cidades`
--
ALTER TABLE `cidades`
  ADD PRIMARY KEY (`idcidade`),
  ADD KEY `FK_ESTADO_CIDADE` (`fk_idestado`);

--
-- Índices de tabela `enderecos`
--
ALTER TABLE `enderecos`
  ADD PRIMARY KEY (`idendereco`),
  ADD KEY `FK_CIDADE_ENDERECO` (`fk_idcidade`),
  ADD KEY `FK_BAIRRO_ENDERECO` (`fk_idbairro`),
  ADD KEY `FK_RUA_ENDERECO` (`fk_idrua`),
  ADD KEY `FK_ESTADO_ENDERECO` (`fk_idestado`);

--
-- Índices de tabela `especiespet`
--
ALTER TABLE `especiespet`
  ADD PRIMARY KEY (`idespeciepet`);

--
-- Índices de tabela `estados`
--
ALTER TABLE `estados`
  ADD PRIMARY KEY (`idestado`);

--
-- Índices de tabela `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD PRIMARY KEY (`idfuncionario`),
  ADD KEY `FK_ONG_FUNCIONARIO` (`fk_idong`),
  ADD KEY `FK_USUARIO_FUNCIONARIO` (`fk_idusuario`),
  ADD KEY `FK_RESPONSAVEL_FUNCIONARIO` (`fk_idresponsavel`);

--
-- Índices de tabela `ongs`
--
ALTER TABLE `ongs`
  ADD PRIMARY KEY (`idong`),
  ADD UNIQUE KEY `cnpj` (`cnpj`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `FK_ENDERECO_ONG` (`fk_idendereco`),
  ADD KEY `FK_TIPO_ONGS` (`fk_idtipo`);

--
-- Índices de tabela `ongsfavoritadas`
--
ALTER TABLE `ongsfavoritadas`
  ADD PRIMARY KEY (`idongfavoritada`),
  ADD KEY `FK_USUARIO_ONGFAVORITADA` (`fk_idusuario`),
  ADD KEY `FK_ONG_ONGFAVORITADA` (`fk_idong`);

--
-- Índices de tabela `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`idpet`),
  ADD KEY `FK_SEXO_PET` (`fk_idsexopet`),
  ADD KEY `FK_ESPECIE_PET` (`fk_idespecie`),
  ADD KEY `FK_RACA_PET` (`fk_idraca`),
  ADD KEY `FK_PORTE_PET` (`fk_idporte`),
  ADD KEY `FK_RESPONSAVEL_PET` (`fk_idresponsavel`),
  ADD KEY `FK_ONG_PET` (`fk_idong`),
  ADD KEY `FK_STATUS_PET` (`fk_idstatus`);

--
-- Índices de tabela `petsfavoritados`
--
ALTER TABLE `petsfavoritados`
  ADD PRIMARY KEY (`idpetfavoritado`),
  ADD KEY `FK_USUARIO_PETFAVORITADO` (`fk_idusuario`),
  ADD KEY `FK_PET_PETFAVORITADO` (`fk_idpet`);

--
-- Índices de tabela `portespet`
--
ALTER TABLE `portespet`
  ADD PRIMARY KEY (`idportepet`);

--
-- Índices de tabela `racaspet`
--
ALTER TABLE `racaspet`
  ADD PRIMARY KEY (`idracapet`),
  ADD KEY `FK_ESPECIE_RACASPET` (`fk_idespeciepet`);

--
-- Índices de tabela `redessociais`
--
ALTER TABLE `redessociais`
  ADD PRIMARY KEY (`idredesocial`),
  ADD KEY `FK_ONG_REDESSOCIAIS` (`fk_idong`);

--
-- Índices de tabela `responsaveis`
--
ALTER TABLE `responsaveis`
  ADD PRIMARY KEY (`idresponsavel`),
  ADD KEY `FK_USUARIO_RESPONSAVEL` (`fk_idusuario`),
  ADD KEY `FK_ONG_RESPONSAVEL` (`fk_idong`);

--
-- Índices de tabela `ruas`
--
ALTER TABLE `ruas`
  ADD PRIMARY KEY (`idrua`),
  ADD KEY `FK_BAIRRO_RUA` (`fk_idbairro`);

--
-- Índices de tabela `sexo`
--
ALTER TABLE `sexo`
  ADD PRIMARY KEY (`idsexo`);

--
-- Índices de tabela `sexospet`
--
ALTER TABLE `sexospet`
  ADD PRIMARY KEY (`idsexopet`);

--
-- Índices de tabela `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`idstatus`);

--
-- Índices de tabela `tipos_usuario`
--
ALTER TABLE `tipos_usuario`
  ADD PRIMARY KEY (`idtipo`),
  ADD UNIQUE KEY `tipo` (`tipo`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idusuario`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `cpf` (`cpf`),
  ADD KEY `FK_SEXO_USUARIO` (`fk_idsexo`),
  ADD KEY `FK_ENDERECO_USUARIO` (`fk_idendereco`),
  ADD KEY `FK_TIPO_USUARIO` (`fk_idtipo`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `bairros`
--
ALTER TABLE `bairros`
  MODIFY `idbairro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `cidades`
--
ALTER TABLE `cidades`
  MODIFY `idcidade` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `enderecos`
--
ALTER TABLE `enderecos`
  MODIFY `idendereco` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `especiespet`
--
ALTER TABLE `especiespet`
  MODIFY `idespeciepet` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `estados`
--
ALTER TABLE `estados`
  MODIFY `idestado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `funcionarios`
--
ALTER TABLE `funcionarios`
  MODIFY `idfuncionario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `ongs`
--
ALTER TABLE `ongs`
  MODIFY `idong` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `ongsfavoritadas`
--
ALTER TABLE `ongsfavoritadas`
  MODIFY `idongfavoritada` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pets`
--
ALTER TABLE `pets`
  MODIFY `idpet` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `petsfavoritados`
--
ALTER TABLE `petsfavoritados`
  MODIFY `idpetfavoritado` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `portespet`
--
ALTER TABLE `portespet`
  MODIFY `idportepet` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `racaspet`
--
ALTER TABLE `racaspet`
  MODIFY `idracapet` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `redessociais`
--
ALTER TABLE `redessociais`
  MODIFY `idredesocial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `responsaveis`
--
ALTER TABLE `responsaveis`
  MODIFY `idresponsavel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `ruas`
--
ALTER TABLE `ruas`
  MODIFY `idrua` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `sexo`
--
ALTER TABLE `sexo`
  MODIFY `idsexo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `sexospet`
--
ALTER TABLE `sexospet`
  MODIFY `idsexopet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `status`
--
ALTER TABLE `status`
  MODIFY `idstatus` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `tipos_usuario`
--
ALTER TABLE `tipos_usuario`
  MODIFY `idtipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idusuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `bairros`
--
ALTER TABLE `bairros`
  ADD CONSTRAINT `FK_CIDADE_BAIRRO` FOREIGN KEY (`fk_idcidade`) REFERENCES `cidades` (`idcidade`);

--
-- Restrições para tabelas `cidades`
--
ALTER TABLE `cidades`
  ADD CONSTRAINT `FK_ESTADO_CIDADE` FOREIGN KEY (`fk_idestado`) REFERENCES `estados` (`idestado`);

--
-- Restrições para tabelas `enderecos`
--
ALTER TABLE `enderecos`
  ADD CONSTRAINT `FK_BAIRRO_ENDERECO` FOREIGN KEY (`fk_idbairro`) REFERENCES `bairros` (`idbairro`),
  ADD CONSTRAINT `FK_CIDADE_ENDERECO` FOREIGN KEY (`fk_idcidade`) REFERENCES `cidades` (`idcidade`),
  ADD CONSTRAINT `FK_ESTADO_ENDERECO` FOREIGN KEY (`fk_idestado`) REFERENCES `estados` (`idestado`),
  ADD CONSTRAINT `FK_RUA_ENDERECO` FOREIGN KEY (`fk_idrua`) REFERENCES `ruas` (`idrua`);

--
-- Restrições para tabelas `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD CONSTRAINT `FK_ONG_FUNCIONARIO` FOREIGN KEY (`fk_idong`) REFERENCES `ongs` (`idong`),
  ADD CONSTRAINT `FK_RESPONSAVEL_FUNCIONARIO` FOREIGN KEY (`fk_idresponsavel`) REFERENCES `responsaveis` (`idresponsavel`),
  ADD CONSTRAINT `FK_USUARIO_FUNCIONARIO` FOREIGN KEY (`fk_idusuario`) REFERENCES `usuarios` (`idusuario`);

--
-- Restrições para tabelas `ongs`
--
ALTER TABLE `ongs`
  ADD CONSTRAINT `FK_ENDERECO_ONG` FOREIGN KEY (`fk_idendereco`) REFERENCES `enderecos` (`idendereco`),
  ADD CONSTRAINT `FK_TIPO_ONGS` FOREIGN KEY (`fk_idtipo`) REFERENCES `tipos_usuario` (`idtipo`);

--
-- Restrições para tabelas `ongsfavoritadas`
--
ALTER TABLE `ongsfavoritadas`
  ADD CONSTRAINT `FK_ONG_ONGFAVORITADA` FOREIGN KEY (`fk_idong`) REFERENCES `ongs` (`idong`),
  ADD CONSTRAINT `FK_USUARIO_ONGFAVORITADA` FOREIGN KEY (`fk_idusuario`) REFERENCES `usuarios` (`idusuario`);

--
-- Restrições para tabelas `pets`
--
ALTER TABLE `pets`
  ADD CONSTRAINT `FK_ESPECIE_PET` FOREIGN KEY (`fk_idespecie`) REFERENCES `especiespet` (`idespeciepet`),
  ADD CONSTRAINT `FK_ONG_PET` FOREIGN KEY (`fk_idong`) REFERENCES `ongs` (`idong`),
  ADD CONSTRAINT `FK_PORTE_PET` FOREIGN KEY (`fk_idporte`) REFERENCES `portespet` (`idportepet`),
  ADD CONSTRAINT `FK_RACA_PET` FOREIGN KEY (`fk_idraca`) REFERENCES `racaspet` (`idracapet`),
  ADD CONSTRAINT `FK_RESPONSAVEL_PET` FOREIGN KEY (`fk_idresponsavel`) REFERENCES `responsaveis` (`idresponsavel`),
  ADD CONSTRAINT `FK_SEXO_PET` FOREIGN KEY (`fk_idsexopet`) REFERENCES `sexospet` (`idsexopet`),
  ADD CONSTRAINT `FK_STATUS_PET` FOREIGN KEY (`fk_idstatus`) REFERENCES `status` (`idstatus`);

--
-- Restrições para tabelas `petsfavoritados`
--
ALTER TABLE `petsfavoritados`
  ADD CONSTRAINT `FK_PET_PETFAVORITADO` FOREIGN KEY (`fk_idpet`) REFERENCES `pets` (`idpet`),
  ADD CONSTRAINT `FK_USUARIO_PETFAVORITADO` FOREIGN KEY (`fk_idusuario`) REFERENCES `usuarios` (`idusuario`);

--
-- Restrições para tabelas `racaspet`
--
ALTER TABLE `racaspet`
  ADD CONSTRAINT `FK_ESPECIE_RACASPET` FOREIGN KEY (`fk_idespeciepet`) REFERENCES `especiespet` (`idespeciepet`);

--
-- Restrições para tabelas `redessociais`
--
ALTER TABLE `redessociais`
  ADD CONSTRAINT `FK_ONG_REDESSOCIAIS` FOREIGN KEY (`fk_idong`) REFERENCES `ongs` (`idong`);

--
-- Restrições para tabelas `responsaveis`
--
ALTER TABLE `responsaveis`
  ADD CONSTRAINT `FK_ONG_RESPONSAVEL` FOREIGN KEY (`fk_idong`) REFERENCES `ongs` (`idong`),
  ADD CONSTRAINT `FK_USUARIO_RESPONSAVEL` FOREIGN KEY (`fk_idusuario`) REFERENCES `usuarios` (`idusuario`);

--
-- Restrições para tabelas `ruas`
--
ALTER TABLE `ruas`
  ADD CONSTRAINT `FK_BAIRRO_RUA` FOREIGN KEY (`fk_idbairro`) REFERENCES `bairros` (`idbairro`);

--
-- Restrições para tabelas `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `FK_ENDERECO_USUARIO` FOREIGN KEY (`fk_idendereco`) REFERENCES `enderecos` (`idendereco`),
  ADD CONSTRAINT `FK_SEXO_USUARIO` FOREIGN KEY (`fk_idsexo`) REFERENCES `sexo` (`idsexo`),
  ADD CONSTRAINT `FK_TIPO_USUARIO` FOREIGN KEY (`fk_idtipo`) REFERENCES `tipos_usuario` (`idtipo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
