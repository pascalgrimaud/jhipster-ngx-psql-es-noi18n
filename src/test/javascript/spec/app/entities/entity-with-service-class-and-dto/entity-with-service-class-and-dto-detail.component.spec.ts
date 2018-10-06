/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { EntityWithServiceClassAndDTODetailComponent } from 'app/entities/entity-with-service-class-and-dto/entity-with-service-class-and-dto-detail.component';
import { EntityWithServiceClassAndDTO } from 'app/shared/model/entity-with-service-class-and-dto.model';

describe('Component Tests', () => {
    describe('EntityWithServiceClassAndDTO Management Detail Component', () => {
        let comp: EntityWithServiceClassAndDTODetailComponent;
        let fixture: ComponentFixture<EntityWithServiceClassAndDTODetailComponent>;
        const route = ({ data: of({ entityWithServiceClassAndDTO: new EntityWithServiceClassAndDTO(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [EntityWithServiceClassAndDTODetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EntityWithServiceClassAndDTODetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EntityWithServiceClassAndDTODetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.entityWithServiceClassAndDTO).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
