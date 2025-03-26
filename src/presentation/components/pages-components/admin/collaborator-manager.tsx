import React from "react";
import { Button } from "../../global-components/button";
import { ArrowRight, Plus } from "lucide-react";
import { Heading } from "@/presentation/components/global-components/text/heading";
import { useQuery } from "@tanstack/react-query";
import { AdminProjectCardSkeleton } from "@/presentation/components/skeletons/admin-project-card-skeleton";
import { getCollaborators } from "@/infra/adapters/collaborators/get-collaborators";
import { AdminCollaboratorCard } from "./collaborator-card";

export function CollaboratorManager() {
  const { data: collaborators, isLoading } = useQuery({
    queryKey: ["last-collaborators"],
    queryFn: () => getCollaborators(5),
  });

  return (
    <article className={"animate-showing opacity-0 flex flex-col gap-12"}>
      <div
        className={
          "flex flex-col gap-2  justify-between sm:flex-row sm:items-center"
        }
      >
        <Heading>Gerencie seus colaboradores</Heading>
        <Button href={"/admin/collaborators/create"} Icon={Plus}>
          Adicionar um colaborador
        </Button>
      </div>
      <section className={"flex flex-col lg:flex-row justify-start gap-4"}>
        {isLoading &&
          Array.from({ length: 3 }).map(() => <AdminProjectCardSkeleton />)}

        {collaborators && collaborators.length === 0 && (
          <p className={"text-gray-500 text-sm"}>
            Você ainda não possui colaboradores cadastrados
          </p>
        )}

        {collaborators &&
          collaborators.map(
            (collab, i) =>
              i < 4 && (
                <AdminCollaboratorCard
                  collaborator={{
                    ...collab,
                    image: collab.images[0],
                  }}
                />
              )
          )}
      </section>
      {collaborators && collaborators.length > 4 && (
        <Button
          href={"/admin/collaborators"}
          variant={"outline"}
          className={"self-end"}
          Icon={ArrowRight}
        >
          Ver todos os colaboradores
        </Button>
      )}
    </article>
  );
}
