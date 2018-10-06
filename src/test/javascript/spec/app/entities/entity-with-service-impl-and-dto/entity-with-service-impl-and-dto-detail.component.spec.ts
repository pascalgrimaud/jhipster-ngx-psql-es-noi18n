/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithServiceImplAndDTODetailComponent } from 'app/entities/entity-with-service-impl-and-dto/entity-with-service-impl-and-dto-detail.component';
import { EntityWithServiceImplAndDTO } from 'app/shared/model/entity-with-service-impl-and-dto.model';

describe('Component Tests', () => {
    describe('EntityWithServiceImplAndDTO Management Detail Component', () => {
        let comp: EntityWithServiceImplAndDTODetailComponent;
        let fixture: ComponentFixture<EntityWithServiceImplAndDTODetailComponent>;
        const route = ({ data: of({ entityWithServiceImplAndDTO: new EntityWithServiceImplAndDTO(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithServiceImplAndDTODetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EntityWithServiceImplAndDTODetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EntityWithServiceImplAndDTODetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.entityWithServiceImplAndDTO).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
