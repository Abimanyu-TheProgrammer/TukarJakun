package csui.advpro2021.groupassignment.repository;

import csui.advpro2021.groupassignment.entity.Jakun;
import org.springframework.data.repository.CrudRepository;


public interface JakunRepository extends CrudRepository<Jakun, String> {

    Jakun findByOwnerId(String id);

}
