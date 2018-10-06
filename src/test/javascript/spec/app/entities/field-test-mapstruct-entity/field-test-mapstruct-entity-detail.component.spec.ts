/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { FieldTestMapstructEntityDetailComponent } from 'app/entities/field-test-mapstruct-entity/field-test-mapstruct-entity-detail.component';
import { FieldTestMapstructEntity } from 'app/shared/model/field-test-mapstruct-entity.model';

describe('Component Tests', () => {
    describe('FieldTestMapstructEntity Management Detail Component', () => {
        let comp: FieldTestMapstructEntityDetailComponent;
        let fixture: ComponentFixture<FieldTestMapstructEntityDetailComponent>;
        const route = ({ data: of({ fieldTestMapstructEntity: new FieldTestMapstructEntity(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [FieldTestMapstructEntityDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FieldTestMapstructEntityDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FieldTestMapstructEntityDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.fieldTestMapstructEntity).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
