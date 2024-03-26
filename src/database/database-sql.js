import { sql } from "./sql.js";

export class DatabasePostgres {
  async create(projetos) {
    const { name, description, thumbnail, repositorylink, projectlink } =
      projetos;

    await sql`insert into projetos ("name", description, thumbnail, repositorylink, projectlink) values (${name},${description}, ${thumbnail},${repositorylink},${projectlink})`;
  }

  async update(id, projetos) {
    const { name, description, thumbnail, repositorylink, projectlink } =
      projetos;

    await sql`UPDATE projetos
      SET name = ${name},
      description = ${description},
      thumbnail = ${thumbnail},
      repositorylink = ${repositorylink},
      projectLink = ${projectlink}
      WHERE id ilike ${"%" + id + "%"};`;
  }

  async delete(id) {
    await sql`DELETE FROM projetos WHERE id = ${id}; `;
  }

  async read(search) {
    let projetos;
    if (search) {
      projetos = await sql`select * from projetos where name ilike ${
        "%" + search + "%"
      }`;
    } else {
      projetos = await sql`select * from projetos`;
    }
    return projetos;
  }
}
