/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithServiceClassPaginationAndDTODetailComponent } from 'app/entities/entity-with-service-class-pagination-and-dto/entity-with-service-class-pagination-and-dto-detail.component';
import { EntityWithServiceClassPaginationAndDTO } from 'app/shared/model/entity-with-service-class-pagination-and-dto.model';

describe('Component Tests', () => {
    describe('EntityWithServiceClassPaginationAndDTO Management Detail Component', () => {
        let comp: EntityWithServiceClassPaginationAndDTODetailComponent;
        let fixture: ComponentFixture<EntityWithServiceClassPaginationAndDTODetailComponent>;
        const route = ({
            data: of({ entityWithServiceClassPaginationAndDTO: new EntityWithServiceClassPaginationAndDTO(123) })
        } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithServiceClassPaginationAndDTODetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EntityWithServiceClassPaginationAndDTODetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EntityWithServiceClassPaginationAndDTODetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.entityWithServiceClassPaginationAndDTO).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
